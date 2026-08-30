"use client"

import dynamic from "next/dynamic"

// WebGL ornament, client-only and in its own chunk (same treatment as the
// three.js fields). The hero renders text-first with no wash until it lands.
export const LazyHeroWash = dynamic(
  () =>
    import("@/components/home/hero-wash").then((m) => ({
      default: m.HeroWash,
    })),
  { ssr: false }
)
