import * as THREE from "three"

// Shared plumbing for the site's dot-field ornaments: one point material so
// every field draws the same soft disc, and one render loop that only runs
// while the canvas is on screen, the tab is visible, and motion is allowed.

/**
 * Points drawn as soft discs with a per-point alpha attribute (`aAlpha`),
 * which PointsMaterial cannot do. Size is in CSS pixels, no attenuation, so
 * it pairs with an orthographic camera whose units are pixels.
 */
export function createDotMaterial({
  color,
  opacity,
  size,
}: {
  color: number
  opacity: number
  size: number
}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uSize: { value: size },
      uPixelRatio: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float aAlpha;
      uniform float uSize;
      uniform float uPixelRatio;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = uSize * uPixelRatio;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float disc = 1.0 - smoothstep(0.32, 0.5, d);
        gl_FragColor = vec4(uColor, disc * vAlpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
  })
}

/**
 * A flat, top-down scene whose world units are CSS pixels centred on the
 * container. Fields lay their dots out in a fixed box larger than any
 * section; the camera frustum simply crops to the container.
 */
export function createFlatScene(container: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1
  return {
    renderer,
    scene,
    camera,
    resize: (width: number, height: number) => {
      camera.left = -width / 2
      camera.right = width / 2
      camera.top = height / 2
      camera.bottom = -height / 2
      camera.updateProjectionMatrix()
    },
  }
}

export function createLoop({
  container,
  renderer,
  scene,
  camera,
  onResize,
  update,
}: {
  container: HTMLElement
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.Camera
  onResize: (width: number, height: number) => void
  update: (delta: number, elapsed: number) => void
}) {
  // Held hidden until there is a frame to show, so the section never flashes
  // a blank canvas while the chunk loads.
  let revealed = false
  const draw = () => {
    renderer.render(scene, camera)
    if (!revealed) {
      revealed = true
      container.style.opacity = "1"
    }
  }

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    // Hidden on small screens, so the first measurement can be zero; the
    // observer re-runs this once the element is actually laid out.
    if (width === 0 || height === 0) return
    onResize(width, height)
    renderer.setSize(width, height)
    draw()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  resize()

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let inView = false
  let frame = 0
  let last = performance.now()
  let elapsed = 0

  const tick = (now: number) => {
    const delta = (now - last) / 1000
    elapsed += delta
    last = now
    update(delta, elapsed)
    draw()
    frame = requestAnimationFrame(tick)
  }
  const start = () => {
    if (frame || !inView || reduceMotion.matches || document.hidden) return
    last = performance.now()
    frame = requestAnimationFrame(tick)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }
  // Several fields share one page: each only burns GPU while scrolled into
  // view, and none while the tab is in the background.
  const viewObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    if (inView) start()
    else stop()
  })
  viewObserver.observe(container)
  const onVisibility = () => (document.hidden ? stop() : start())
  const onMotionPreference = () => (reduceMotion.matches ? stop() : start())
  document.addEventListener("visibilitychange", onVisibility)
  reduceMotion.addEventListener("change", onMotionPreference)

  return () => {
    stop()
    resizeObserver.disconnect()
    viewObserver.disconnect()
    document.removeEventListener("visibilitychange", onVisibility)
    reduceMotion.removeEventListener("change", onMotionPreference)
  }
}
