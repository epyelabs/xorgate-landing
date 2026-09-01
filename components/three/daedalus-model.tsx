"use client"

import * as React from "react"
import * as THREE from "three"
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js"
import { ConvexHull } from "three/examples/jsm/math/ConvexHull.js"
import { MoveHorizontal } from "lucide-react"
import { createLoop } from "./scene"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Daedalus CAD models on a transparent canvas, so they sit straight on the
// section surface with no frame: a shaded mesh with its own feature edges
// drawn over it, which reads far better than a bare shaded body. Drag turns
// it; left alone it sways through a three-quarter view. Pass more than one
// view and a button switches between them, in place and at one scale.

/**
 * Feature-edge threshold in degrees. The meshes are ~150k triangles, so
 * drawing every triangle edge reads as mud; at 30 degrees only the edges
 * where two faces genuinely meet survive, which is what gives the body its
 * definition.
 */
const EDGE_ANGLE = 30
/**
 * The idle sway: SWAY rad either side of the resting yaw, one pass every
 * 2*PI/RATE seconds. It rides on top of whatever yaw the viewer has dragged
 * to, and holds still while they are dragging. The resting yaw is per usage,
 * because a solid bar and an exploded stack want different angles.
 */
const REST_YAW = -0.68
const SWAY = 0.26
const RATE = 0.22
/** Barely off level: the bar sits as it would in service, not nose-down. */
const PITCH = -0.26
/**
 * Breathing room between the model and the frustum edges. The fit below is
 * exact, so this only has to cover the width of a drawn edge; a bounding-box
 * fit would need slack here, and would still crop a model whose mass reaches
 * a corner.
 */
const PADDING = 1.01
/** Yaw steps the fit checks around the full turn a drag can reach. */
const FIT_SAMPLES = 48
/** Narrow enough to read as a technical drawing rather than a wide-angle shot. */
const FOV = 26
/** Radians of yaw per pixel dragged: a drag across the canvas is about a turn. */
const DRAG_SPEED = 0.009
/** Edges sit just short of solid, so they describe the body without inking it. */
const EDGE_OPACITY = 0.9
/** Gap in px between the model's lowest point and the top of the drag hint. */
const HINT_GAP = 10
/** Height of the hint icon in px, matching its size-5 class. */
const HINT_SIZE = 20

/**
 * Surface and edge colours per theme. Edges carry much darker on the cream
 * ground than they can on the near-black one, where the same value would
 * disappear into the body, so the two themes get their own pair.
 */
const PALETTE = {
  light: { edge: 0x3f3f3f, surface: 0xe7e5e0 },
  dark: { edge: 0xc8c8c8, surface: 0x2e2e2e },
}

function resolveTheme(): keyof typeof PALETTE {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

/** One switchable model. `label` is the button text that switches TO it. */
export type ModelView = { id: string; label: string; src: string }

export function DaedalusModel({
  views,
  label,
  className,
  restYaw = REST_YAW,
}: {
  /** Models the viewer can switch between; the first one is shown initially. */
  views: ModelView[]
  /** Describes the model for screen readers, the way an img alt would. */
  label: string
  className?: string
  restYaw?: number
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)
  // Distance from the canvas bottom to the hint, measured off the model.
  const [hintBottom, setHintBottom] = React.useState(0)
  // The hint has done its job the moment they grab the model.
  const [dragged, setDragged] = React.useState(false)
  const [activeId, setActiveId] = React.useState(views[0].id)
  // Non-null while a view the viewer asked for is still downloading.
  const [pendingId, setPendingId] = React.useState<string | null>(null)
  const showRef = React.useRef<((id: string) => void) | undefined>(undefined)
  const loadRef = React.useRef<((id: string) => void) | undefined>(undefined)

  // The effect closes over `views`; re-run it only when the models themselves
  // change, not when the caller happens to rebuild the array literal.
  const viewsRef = React.useRef(views)
  viewsRef.current = views
  const viewKey = views.map((view) => view.src).join("|")

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let teardown: (() => void) | undefined

    const build = async () => {
      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      } catch {
        // No WebGL: the section keeps its heading and its space.
        return
      }

      const edgeMaterial = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: EDGE_OPACITY,
      })
      const surfaceMaterial = new THREE.MeshLambertMaterial({
        // Pushed back off the edges so the lines stay crisp on top of it.
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      })
      const paint = () => {
        const theme = PALETTE[resolveTheme()]
        edgeMaterial.color.setHex(theme.edge)
        surfaceMaterial.color.setHex(theme.surface)
      }
      paint()

      const pivot = new THREE.Group()
      pivot.rotation.order = "YXZ"
      pivot.rotation.x = PITCH
      pivot.rotation.y = restYaw

      const scene = new THREE.Scene()
      scene.add(pivot)
      const key = new THREE.DirectionalLight(0xffffff, 2.2)
      key.position.set(0.4, 1, 1)
      scene.add(key, new THREE.AmbientLight(0xffffff, 1.4))
      const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 4000)

      // What the camera has to clear, per view, so each one is composed on
      // its own terms: the exploded kit is three times as deep as the
      // assembled one and would otherwise leave it stranded in the frame.
      // A bounding sphere is rotation-proof but far too generous for a slab;
      // a bounding box is tighter but crops a model whose mass reaches a
      // corner, which the exploded kit does. The convex hull is the exact
      // answer, costs ~60ms for ~500 points, and the frustum demand below is
      // maximised on a hull vertex for any yaw and any aspect.
      let fitted: Float32Array<ArrayBuffer> = new Float32Array(0)
      const prerotate = (hull: Float32Array<ArrayBuffer>) => {
        // A drag can reach any yaw, so pre-rotate the hull right around the
        // turn; the distance clearing every one of these points is the fit.
        const out = new Float32Array(hull.length * FIT_SAMPLES)
        const point = new THREE.Vector3()
        const pose = new THREE.Euler(PITCH, 0, 0, "YXZ")
        for (let step = 0; step < FIT_SAMPLES; step++) {
          pose.y = (2 * Math.PI * step) / FIT_SAMPLES
          const rotation = new THREE.Matrix4().makeRotationFromEuler(pose)
          const base = step * hull.length
          for (let i = 0; i < hull.length; i += 3) {
            point.set(hull[i], hull[i + 1], hull[i + 2]).applyMatrix4(rotation)
            out[base + i] = point.x
            out[base + i + 1] = point.y
            out[base + i + 2] = point.z
          }
        }
        return out
      }

      // With the camera on +Z looking at the origin, a corner at (x, y, z)
      // stays inside the frustum from |x| / tan(hFov / 2) + z back, so the
      // furthest such demand is the fit. Re-run per resize, because the
      // horizontal angle moves with the column's aspect.
      let width = 1
      let height = 1
      const place = () => {
        camera.aspect = width / height
        const vertical = (camera.fov * Math.PI) / 180
        const tanV = Math.tan(vertical / 2)
        const tanH = tanV * camera.aspect
        let distance = 0
        for (let i = 0; i < fitted.length; i += 3) {
          const z = fitted[i + 2]
          distance = Math.max(
            distance,
            Math.abs(fitted[i]) / tanH + z,
            Math.abs(fitted[i + 1]) / tanV + z
          )
        }
        camera.position.set(0, 0, distance * PADDING)
        camera.updateProjectionMatrix()
      }
      // Park the drag hint just under the model rather than on the canvas
      // floor, which can sit a long way below a model that does not fill its
      // box. The hint only exists until the first drag, so measuring the
      // resting pose is enough; it never has to track the sway.
      let resting = new Float32Array(0)
      const restPose = new THREE.Matrix4().makeRotationFromEuler(
        new THREE.Euler(PITCH, restYaw, 0, "YXZ")
      )
      const measureHint = () => {
        camera.updateMatrixWorld()
        const point = new THREE.Vector3()
        let lowest = 1
        for (let i = 0; i < resting.length; i += 3) {
          point
            .set(resting[i], resting[i + 1], resting[i + 2])
            .applyMatrix4(restPose)
            .project(camera)
          if (point.y < lowest) lowest = point.y
        }
        // Clip space runs -1 at the bottom of the canvas to +1 at the top.
        const floor = ((lowest + 1) / 2) * height
        setHintBottom(Math.max(0, floor - HINT_GAP - HINT_SIZE))
      }

      const onResize = (nextWidth: number, nextHeight: number) => {
        width = nextWidth
        height = nextHeight
        place()
        measureHint()
      }

      const draw = () => renderer.render(scene, camera)
      const groups = new Map<
        string,
        {
          group: THREE.Group
          fitted: Float32Array<ArrayBuffer>
          hull: Float32Array<ArrayBuffer>
        }
      >()
      const pending = new Map<string, Promise<void>>()

      const load = (id: string) => {
        const existing = pending.get(id)
        if (existing) return existing
        const view = viewsRef.current.find((candidate) => candidate.id === id)
        if (!view) return Promise.resolve()
        const task = (async () => {
          const response = await fetch(view.src)
          if (!response.ok) throw new Error(`${response.status}`)
          const buffer = await response.arrayBuffer()
          if (disposed) return
          const mesh = new STLLoader().parse(buffer)
          // EdgesGeometry welds the STL's duplicated vertices itself, so the
          // triangle soup needs no merge pass before the creases are found.
          const edges = new THREE.EdgesGeometry(mesh, EDGE_ANGLE)
          // Two corrections, applied to both geometries so they stay
          // registered: the export stands the board on its long axis, so lay
          // it across the frame; and the cameras sit on the underside
          // pointing along the board normal, so stand the board up to aim
          // them forward rather than at the ground.
          for (const geometry of [edges, mesh]) {
            geometry.rotateZ(-Math.PI / 2)
            geometry.rotateX(-Math.PI / 2)
          }
          edges.computeBoundingBox()
          const centre = edges
            .boundingBox!.getCenter(new THREE.Vector3())
            .multiplyScalar(-1)
          edges.translate(centre.x, centre.y, centre.z)
          mesh.translate(centre.x, centre.y, centre.z)

          const group = new THREE.Group()
          group.add(
            new THREE.LineSegments(edges, edgeMaterial),
            new THREE.Mesh(mesh, surfaceMaterial)
          )
          group.visible = false
          pivot.add(group)

          const position = mesh.attributes.position
          const cloud: THREE.Vector3[] = []
          for (let i = 0; i < position.count; i++) {
            cloud.push(new THREE.Vector3().fromBufferAttribute(position, i))
          }
          const vertices = new Set<THREE.Vector3>()
          for (const face of new ConvexHull().setFromPoints(cloud).faces) {
            let edge = face.edge
            do {
              vertices.add(edge.head().point)
              edge = edge.next
            } while (edge !== face.edge)
          }
          const hull = new Float32Array(vertices.size * 3)
          let cursor = 0
          for (const vertex of vertices) {
            hull[cursor++] = vertex.x
            hull[cursor++] = vertex.y
            hull[cursor++] = vertex.z
          }
          groups.set(id, { group, fitted: prerotate(hull), hull })
        })()
        pending.set(id, task)
        return task
      }

      const show = (id: string) => {
        const active = groups.get(id)
        if (!active) return
        for (const [candidate, entry] of groups) {
          entry.group.visible = candidate === id
        }
        fitted = active.fitted
        resting = active.hull
        place()
        measureHint()
        draw()
      }

      const first = viewsRef.current[0]
      try {
        await load(first.id)
      } catch {
        // Model unreachable: the section keeps its heading and its space.
        edgeMaterial.dispose()
        surfaceMaterial.dispose()
        renderer.dispose()
        return
      }
      if (disposed) {
        for (const entry of groups.values()) entry.group.clear()
        edgeMaterial.dispose()
        surfaceMaterial.dispose()
        renderer.dispose()
        return
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)
      show(first.id)

      let yaw = restYaw
      let phase = 0
      let dragging = false
      let lastX = 0

      const onPointerDown = (event: PointerEvent) => {
        dragging = true
        lastX = event.clientX
        renderer.domElement.setPointerCapture(event.pointerId)
        setDragged(true)
      }
      const onPointerMove = (event: PointerEvent) => {
        if (!dragging) return
        yaw += (event.clientX - lastX) * DRAG_SPEED
        lastX = event.clientX
        pivot.rotation.y = yaw + Math.sin(phase) * SWAY
        // The render loop only runs while the section is on screen, the tab
        // is visible and motion is allowed, so a drag under reduced motion
        // has to draw its own frames.
        draw()
      }
      const onPointerUp = (event: PointerEvent) => {
        dragging = false
        renderer.domElement.releasePointerCapture(event.pointerId)
      }
      renderer.domElement.addEventListener("pointerdown", onPointerDown)
      renderer.domElement.addEventListener("pointermove", onPointerMove)
      renderer.domElement.addEventListener("pointerup", onPointerUp)
      renderer.domElement.addEventListener("pointercancel", onPointerUp)

      // Recolour on a theme flip without refetching or rebuilding.
      const themeObserver = new MutationObserver(() => {
        paint()
        draw()
      })
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      // Each model is its own multi-megabyte download, so the others wait
      // until the viewer reaches for them. Hovering the button is enough.
      loadRef.current = (id: string) => {
        if (groups.has(id)) return
        void load(id).catch(() => {})
      }
      showRef.current = (id: string) => {
        if (groups.has(id)) {
          show(id)
          setActiveId(id)
          return
        }
        setPendingId(id)
        void load(id)
          .then(() => {
            if (disposed) return
            show(id)
            setActiveId(id)
          })
          .catch(() => {})
          .finally(() => {
            if (!disposed) setPendingId(null)
          })
      }

      const stopLoop = createLoop({
        container,
        renderer,
        scene,
        camera,
        onResize,
        // Reduced motion never runs this, and the resting pose is already the
        // middle of the sway.
        update: (delta) => {
          if (!dragging) phase += delta * RATE
          pivot.rotation.y = yaw + Math.sin(phase) * SWAY
        },
      })

      const dispose = () => {
        stopLoop()
        themeObserver.disconnect()
        showRef.current = undefined
        loadRef.current = undefined
        renderer.domElement.removeEventListener("pointerdown", onPointerDown)
        renderer.domElement.removeEventListener("pointermove", onPointerMove)
        renderer.domElement.removeEventListener("pointerup", onPointerUp)
        renderer.domElement.removeEventListener("pointercancel", onPointerUp)
        for (const entry of groups.values()) {
          for (const child of entry.group.children) {
            if (child instanceof THREE.Mesh) child.geometry.dispose()
            if (child instanceof THREE.LineSegments) child.geometry.dispose()
          }
        }
        edgeMaterial.dispose()
        surfaceMaterial.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
      // The build is async, so the effect may already have been torn down.
      if (disposed) dispose()
      else {
        teardown = dispose
        setReady(true)
      }
    }

    // The models are multi-megabyte downloads for one ornament, so nothing is
    // fetched until the section is nearly on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        void build()
      },
      { rootMargin: "300px" }
    )
    observer.observe(container)

    return () => {
      disposed = true
      observer.disconnect()
      teardown?.()
      setReady(false)
    }
  }, [viewKey, restYaw])

  const activeIndex = views.findIndex((view) => view.id === activeId)
  const next = views[(activeIndex + 1) % views.length]
  const switchable = views.length > 1 && next && next.id !== activeId

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        role="img"
        aria-label={label}
        // No corner mask: a shaded body wants a clean silhouette, and the
        // transparent canvas already sits it straight on the section ground.
        className="absolute inset-0 cursor-grab active:cursor-grabbing [&>canvas]:block"
        // Horizontal drags turn the model; vertical ones still scroll the page.
        style={{
          opacity: 0,
          touchAction: "pan-y",
          transition: "opacity 700ms ease",
        }}
      />
      {/* The only cue that the model is more than a picture. Pointer-only,
          so it is hidden from assistive tech, and it retires once used. This
          div owns the fade in and out; the icon does the blinking, so the two
          never fight over opacity. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 flex justify-center",
          "text-muted-foreground/70 transition-opacity duration-500",
          ready && !dragged ? "opacity-100" : "opacity-0"
        )}
        style={{ bottom: hintBottom }}
      >
        <MoveHorizontal className="size-5 animate-pulse motion-reduce:animate-none" />
      </div>
      {/* Centred under the model and hanging below the canvas box, clear of
          the hint that sits on its bottom edge. */}
      {ready && switchable ? (
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-background/70 backdrop-blur-sm"
          disabled={pendingId !== null}
          // Warm the model up on hover, so the click itself is instant.
          onPointerEnter={() => loadRef.current?.(next.id)}
          onFocus={() => loadRef.current?.(next.id)}
          onClick={() => showRef.current?.(next.id)}
        >
          {pendingId === next.id ? "Loading…" : next.label}
        </Button>
      ) : null}
    </div>
  )
}
