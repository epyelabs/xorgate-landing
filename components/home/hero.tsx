import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccentField } from "@/components/section"
import { consoleUrl, docsUrl } from "@/lib/site"

// Text-first hero on the page ground (design.md): the one display-scale
// heading, a subhead, two CTAs. No video, no typing animation. The only
// ornament is the graph-paper accent plus the single soft brand wash the
// design budget allows. The floating navbar overlays the top padding.
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
      <AccentField variant="grid-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />
      <div className="mx-auto flex w-full max-w-content flex-col items-start gap-6 px-6">
        <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-balance md:text-7xl">
          Sense the world. Stream it live. Make it think.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Xorgate is an open-source platform for Physical AI and Edge IoT: a
          device agent for telemetry and live video, a cloud that provisions
          itself, and no-code AI workflows on top.
        </p>
        <div className="mt-2 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button variant="brand" size="xl" asChild>
            <a href={`${consoleUrl}/signup`}>
              Get started
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <a href={docsUrl}>Read the docs</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
