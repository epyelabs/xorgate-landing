import * as React from "react"
import { cn } from "@/lib/utils"

// The one section pattern (design.md): eyebrow -> h2 -> optional intro ->
// content, with a fixed vertical rhythm. Every page section goes through
// these primitives; no ad-hoc paddings or heading styles.

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn("pt-16 pb-24 md:pt-20 md:pb-32", className)}
      {...props}
    >
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
