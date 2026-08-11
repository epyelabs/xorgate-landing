"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Typewriter headline: types a phrase, holds, deletes, moves to the next.
// SSR renders the first phrase in full (sensible static content pre-JS);
// reduced-motion users get the whole sentence statically.
const HOLD_MS = 1800
const TYPE_MS = 55
const DELETE_MS = 30

export function TypingHeadline({
  phrases,
  className,
}: {
  phrases: string[]
  className?: string
}) {
  const [phraseIndex, setPhraseIndex] = React.useState(0)
  const [length, setLength] = React.useState(phrases[0].length)
  const [phase, setPhase] = React.useState<"hold" | "deleting" | "typing">(
    "hold"
  )
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(query.matches)
    const onChange = () => setReducedMotion(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  React.useEffect(() => {
    if (reducedMotion) {
      return
    }

    const phrase = phrases[phraseIndex]

    if (phase === "hold") {
      const timer = window.setTimeout(() => setPhase("deleting"), HOLD_MS)
      return () => window.clearTimeout(timer)
    }

    if (phase === "deleting") {
      if (length === 0) {
        setPhraseIndex((current) => (current + 1) % phrases.length)
        setPhase("typing")
        return
      }
      const timer = window.setTimeout(
        () => setLength((current) => current - 1),
        DELETE_MS
      )
      return () => window.clearTimeout(timer)
    }

    if (length === phrase.length) {
      setPhase("hold")
      return
    }
    const timer = window.setTimeout(
      () => setLength((current) => current + 1),
      TYPE_MS
    )
    return () => window.clearTimeout(timer)
  }, [phase, length, phraseIndex, phrases, reducedMotion])

  return (
    <h1 className={cn("whitespace-nowrap", className)}>
      <span className="sr-only">{phrases.join(" ")}</span>
      {reducedMotion ? (
        <span aria-hidden className="text-balance whitespace-normal">
          {phrases.join(" ")}
        </span>
      ) : (
        <span aria-hidden>
          {phrases[phraseIndex].slice(0, length)}
          {/* Width scales with the fluid headline, with a floor for mobile. */}
          <span className="ml-[0.12em] inline-block h-[0.8em] w-[max(6px,0.18em)] translate-y-[0.05em] animate-caret-blink bg-brand" />
        </span>
      )}
    </h1>
  )
}
