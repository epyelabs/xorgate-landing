import * as React from "react"
import { cn } from "@/lib/utils"

// The one section pattern (design.md): eyebrow -> h2 -> optional intro ->
// content, with a fixed vertical rhythm. Every page section goes through
// these primitives; no ad-hoc paddings or heading styles.

// Geometric accents: quiet marks mixed from the muted-foreground token, so
// they carry in both themes without ever spending the brand-accent budget.
// Opt-in per surface, always aria-hidden, and each one bleeds off a corner
// behind a radial mask so it dissolves before it reaches the text.
export type Accent =
  | "dots-tr"
  | "dots-bl"
  | "hatch-tr"
  | "hatch-bl"
  | "grid-tr"
  | "grid-bl"
  | "grid-br"
  | "grid-full"

// Written out in full on purpose: Tailwind extracts class names statically,
// so a helper that builds these strings would generate no CSS at all. Alpha
// falls as the mark gets more line-like - a dot field reads far lighter than
// the same value drawn as continuous rules.
const patterns = {
  // Dot field: a surface texture, the densest of the three.
  dots: "[background-image:radial-gradient(color-mix(in_oklab,var(--muted-foreground)_55%,transparent)_1px,transparent_1px)] [background-size:22px_22px]",
  // Diagonal hairlines: directional, for sections about flow rather than field.
  hatch:
    "[background-image:repeating-linear-gradient(45deg,color-mix(in_oklab,var(--muted-foreground)_20%,transparent)_0_1px,transparent_1px_11px)]",
  // Square grid: the structural one - graph paper on a small pitch, at the
  // lowest alpha of the three since a full field of crossing lines carries
  // much further than a corner of them.
  grid: "[background-image:repeating-linear-gradient(to_right,color-mix(in_oklab,var(--muted-foreground)_4%,transparent)_0_1px,transparent_1px_16px),repeating-linear-gradient(to_bottom,color-mix(in_oklab,var(--muted-foreground)_4%,transparent)_0_1px,transparent_1px_16px)]",
}

const masks = {
  tr: "[mask-image:radial-gradient(42rem_28rem_at_100%_0%,black,transparent_70%)]",
  bl: "[mask-image:radial-gradient(42rem_28rem_at_0%_100%,black,transparent_70%)]",
  br: "[mask-image:radial-gradient(38rem_20rem_at_100%_100%,black,transparent_72%)]",
  // Whole-surface fill rather than a corner bleed: a soft vignette keeps the
  // field off the edges so it dissolves into the ground instead of stopping.
  full: "[mask-image:radial-gradient(120%_110%_at_50%_40%,black_25%,transparent_85%)]",
}

// Exported so surfaces outside the Section rhythm (the footer) can carry the
// same marks without duplicating the pattern definitions.
export function AccentField({ variant }: { variant: Accent }) {
  const [pattern, corner] = variant.split("-") as [
    keyof typeof patterns,
    keyof typeof masks,
  ]

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        patterns[pattern],
        masks[corner]
      )}
    />
  )
}

export function Section({
  accent,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & { accent?: Accent }) {
  return (
    <section
      className={cn(
        "relative isolate pt-16 pb-24 md:pt-20 md:pb-32",
        className
      )}
      {...props}
    >
      {accent ? <AccentField variant={accent} /> : null}
      <div className="mx-auto w-full max-w-content px-6">{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={cn("mb-12 flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="text-sm font-medium tracking-widest text-brand-strong uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="max-w-2xl text-lg text-muted-foreground">{intro}</p>
      ) : null}
    </div>
  )
}
