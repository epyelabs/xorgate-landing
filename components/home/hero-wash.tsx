"use client"

import * as React from "react"
import { GrainGradient } from "@paper-design/shaders-react"
import type { PaperShaderElement } from "@paper-design/shaders"

// The hero's brand wash, rendered as a Paper Shaders grain gradient in its
// "wave" form: warm color bands that slowly fold and reshape under noisy,
// film-grain distortion, so the wash feels like it was printed rather than
// blurred. The shader background is transparent and a radial CSS mask keeps
// it a soft top-center cloud that dissolves into the page ground, which
// preserves the design's "one wash" budget.
//
// Pointer interaction is written straight to the shader mount (uniforms +
// playback speed) from one rAF loop, no React re-renders:
//   - the gradient's center leans toward the cursor (u_offsetX/Y), damped
//   - the animation runs a little faster while the cursor is over the hero
//   - the mask's focal point drifts toward the cursor so the warmth pools
//     near it and thins away from it
// Everything eases back to rest when the pointer leaves. Reduced motion
// freezes the shader on a single frame and disables tracking.

const LIGHT = ["#fbe9df", "#ffd3c0", "#ffb08f", "#ff7a4d", "#fdf3ec"]
const DARK = ["#2a1a14", "#3d2118", "#6b2e1a", "#c9481f", "#221612"]


function isDark() {
  return document.documentElement.classList.contains("dark")
}

export function HeroWash() {
  const ref = React.useRef<PaperShaderElement>(null)
  const frameRef = React.useRef<HTMLDivElement>(null)
  const [dark, setDark] = React.useState(false)
  // Reduced motion: the shader gets speed 0 (a single static frame, no rAF)
  // and the pointer loop never starts.
  const [still, setStill] = React.useState(false)

  // Follow the theme class the provider toggles on <html>.
  React.useEffect(() => {
    setDark(isDark())
    const observer = new MutationObserver(() => setDark(isDark()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const frame = frameRef.current
    const section = frame?.parentElement
    if (!frame || !section) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true)
      return
    }

    let targetX = 0
    let targetY = 0
    let hoverTarget = 0
    let hover = 0
    let x = 0
    let y = 0
    let raf = 0

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1
      hoverTarget = 1
    }
    const onLeave = () => {
      hoverTarget = 0
    }

    const tick = () => {
      hover += (hoverTarget - hover) * 0.04
      x += (targetX * hover - x) * 0.05
      y += (targetY * hover - y) * 0.05

      const mount = ref.current?.paperShaderMount
      if (mount) {
        // Gradient center leans toward the cursor: a fraction of the
        // shader's [-1, 1] offset range so it reads as a lean, not a jump.
        mount.setUniforms({ u_offsetX: x * 0.35, u_offsetY: -0.3 - y * 0.25 })
        mount.setSpeed(0.35 + hover * 0.45)
      }
      // Mask focal point: rests at top-center, pools toward the cursor.
      const mx = 50 + x * 30
      const my = 8 + (y + 1) * 0.5 * 55 * hover
      frame.style.setProperty("--wash-x", `${mx.toFixed(2)}%`)
      frame.style.setProperty("--wash-y", `${my.toFixed(2)}%`)
      frame.style.setProperty("--wash-a", (0.75 + hover * 0.25).toFixed(3))

      raf = requestAnimationFrame(tick)
    }

    section.addEventListener("pointermove", onMove, { passive: true })
    section.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener("pointermove", onMove)
      section.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={frameRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[var(--wash-a)]"
      style={
        {
          "--wash-x": "50%",
          "--wash-y": "8%",
          "--wash-a": 0.75,
          maskImage:
            "radial-gradient(70% 90% at var(--wash-x) var(--wash-y), black 0%, rgba(0,0,0,0.55) 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(70% 90% at var(--wash-x) var(--wash-y), black 0%, rgba(0,0,0,0.55) 40%, transparent 78%)",
        } as React.CSSProperties
      }
    >
            <GrainGradient
        ref={ref}
        className="h-full w-full"
        colorBack="#00000000"
        colors={dark ? DARK : LIGHT}
        shape="wave"
        softness={0.85}
        intensity={0.45}
        noise={0.4}
        speed={still ? 0 : 0.35}
        scale={1.2}
        minPixelRatio={1}
        maxPixelCount={1920 * 1080}
      />
    </div>
  )
}
