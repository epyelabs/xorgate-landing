"use client"

import dynamic from "next/dynamic"

// three.js is by far the heaviest thing on the site and the field is pure
// ornament, so it lives in its own chunk and only ever renders on the
// client. ssr:false has to live in a client module; server components
// import these wrappers instead of the scenes directly.
export const LazyRippleGrid = dynamic(
  () =>
    import("@/components/three/ripple-grid").then((m) => ({
      default: m.RippleGrid,
    })),
  { ssr: false }
)
