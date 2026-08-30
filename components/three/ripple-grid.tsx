"use client"

import * as React from "react"
import * as THREE from "three"
import { createDotMaterial, createFlatScene, createLoop } from "./scene"
import { cn } from "@/lib/utils"

// A flat lattice of dots, the same pitch as the static dot accent, with
// rings of brightness spreading out from points that light up at random:
// devices pinging in from the field. Most dots sit at a resting alpha so
// the field reads as texture; a ring lifts them briefly as it passes.

/** Lattice pitch in px, matching AccentField's 22px dot field. */
const PITCH = 22
/** Fixed lattice box; the camera crops it to the container. */
const BOX_WIDTH = 2000
const BOX_HEIGHT = 1200
const EMITTERS = 5
/** Ring speed in px/s, and its half-width. */
const SPEED = 70
const RING_WIDTH = 34
const LIFE = 5.5
const REST_ALPHA = 0.3

type Emitter = { x: number; y: number; born: number; life: number }

function spawn(elapsed: number): Emitter {
  return {
    x: (Math.random() - 0.5) * BOX_WIDTH * 0.7,
    y: (Math.random() - 0.5) * BOX_HEIGHT * 0.7,
    // Staggered so several rings are never at the same radius.
    born: elapsed + Math.random() * 2.5,
    life: LIFE * (0.8 + Math.random() * 0.5),
  }
}

export function RippleGrid({
  className,
  color = 0x8a8a8a,
  opacity = 0.65,
}: {
  className?: string
  color?: number
  opacity?: number
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let flat: ReturnType<typeof createFlatScene>
    try {
      flat = createFlatScene(container)
    } catch {
      // No WebGL: the section keeps its static accent.
      return
    }
    const { renderer, scene, camera, resize } = flat

    const cols = Math.floor(BOX_WIDTH / PITCH)
    const rows = Math.floor(BOX_HEIGHT / PITCH)
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const alphas = new Float32Array(count)
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const index = j * cols + i
        positions[index * 3] = (i - cols / 2) * PITCH
        positions[index * 3 + 1] = (j - rows / 2) * PITCH
        alphas[index] = REST_ALPHA
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const alphaAttribute = new THREE.BufferAttribute(alphas, 1)
    geometry.setAttribute("aAlpha", alphaAttribute)

    const material = createDotMaterial({ color, opacity, size: 2.4 })
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio()
    scene.add(new THREE.Points(geometry, material))

    const emitters: Emitter[] = Array.from({ length: EMITTERS }, () =>
      spawn(-Math.random() * LIFE)
    )

    const update = (_delta: number, elapsed: number) => {
      for (let e = 0; e < emitters.length; e++) {
        if (elapsed - emitters[e].born > emitters[e].life) {
          emitters[e] = spawn(elapsed)
        }
      }
      for (let index = 0; index < count; index++) {
        const x = positions[index * 3]
        const y = positions[index * 3 + 1]
        let lift = 0
        for (const emitter of emitters) {
          const age = elapsed - emitter.born
          if (age < 0) continue
          const radius = age * SPEED
          const dx = x - emitter.x
          const dy = y - emitter.y
          const offset = Math.sqrt(dx * dx + dy * dy) - radius
          if (offset > RING_WIDTH * 2 || offset < -RING_WIDTH * 2) continue
          const ring = Math.exp(
            -(offset * offset) / (2 * RING_WIDTH * RING_WIDTH)
          )
          // Fades as it travels, so a ring dies out rather than hitting an edge.
          lift += ring * (1 - age / emitter.life)
        }
        alphas[index] = Math.min(1, REST_ALPHA + lift * (1 - REST_ALPHA))
      }
      alphaAttribute.needsUpdate = true
    }
    update(0, 0)

    const stopLoop = createLoop({
      container,
      renderer,
      scene,
      camera,
      onResize: resize,
      update,
    })

    return () => {
      stopLoop()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [color, opacity])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn("pointer-events-none", className)}
      style={{ opacity: 0, transition: "opacity 700ms ease" }}
    />
  )
}
