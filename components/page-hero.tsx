import * as React from "react"
import { AccentField, type Accent } from "@/components/section"
import { cn } from "@/lib/utils"

// Page-level hero: the one display-scale heading per page (type scale,
// design.md). Sections below it use Section/SectionHeading.
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  className,
  accent,
}: {
  eyebrow?: string
  title: string
  intro?: string
  children?: React.ReactNode
  className?: string
  accent?: Accent
}) {
  return (
    <section className={cn("relative isolate pt-24 pb-16 md:pt-32", className)}>
      {accent ? <AccentField variant={accent} /> : null}
      <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-6">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-widest text-brand-strong uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-5xl font-medium tracking-tight text-balance md:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="max-w-2xl text-lg text-muted-foreground">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  )
}
