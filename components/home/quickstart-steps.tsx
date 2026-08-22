"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Interactivity for the quickstart: the numbered list drives which visual
// shows in the dark panel. Desktop keeps the wendy.dev split (panel left,
// steps right); on mobile the panel renders inline under the active step so
// a tap never updates something off-screen. Panels are server-rendered and
// passed in as ReactNodes, so shiki/code stays out of the client bundle.

export type QuickstartStep = {
  id: string
  title: string
  body: React.ReactNode
  panel: React.ReactNode
}

export function QuickstartSteps({ steps }: { steps: QuickstartStep[] }) {
  const [active, setActive] = React.useState(0)
  const step = steps[active]

  return (
    /* Explicit grid-cols-1: the implicit mobile track is `auto` and would
       grow to the terminal's unbreakable line width; minmax(0,1fr) clamps. */
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
      {/* Keyed on the active step so each swap replays the entrance fade,
          mirroring the section-level Reveal motion. */}
      <div className="hidden md:block md:min-h-[26rem]">
        <div
          key={step.id}
          className="h-full animate-in duration-500 fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
        >
          {step.panel}
        </div>
      </div>
      <ol className="flex flex-col divide-y divide-border">
        {steps.map((s, index) => {
          const selected = index === active
          return (
            <li key={s.id} className="py-5 first:pt-0 last:pb-0">
              {/* The button covers number + title only; the body stays
                  outside so its inline links remain real links. */}
              <button
                type="button"
                aria-expanded={selected}
                onClick={() => setActive(index)}
                className="group flex w-full cursor-pointer gap-6 text-left"
              >
                <span
                  className={cn(
                    "pt-0.5 font-mono text-sm transition-colors",
                    selected
                      ? "text-brand-strong"
                      : "text-muted-foreground/60 group-hover:text-muted-foreground"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-xl font-medium transition-colors",
                    selected
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {s.title}
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                  selected
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex gap-6 pt-1">
                    {/* Spacer matching the number column keeps body aligned
                        with the title. */}
                    <span aria-hidden className="invisible font-mono text-sm">
                      00
                    </span>
                    <p className="text-base text-muted-foreground">{s.body}</p>
                  </div>
                  <div className="mt-4 md:hidden">{s.panel}</div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
