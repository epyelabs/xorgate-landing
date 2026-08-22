import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { consoleUrl, docsUrl } from "@/lib/site"

// Closing CTA, styled after the wendy.dev end card (plan docs): an inset dark
// panel that floats on the page ground just above the dark footer, with the
// hero clip bleeding off its right edge and the copy sitting left over a
// gradient. Same dark surface language as the quickstart panels, one size up.
export function CtaBand() {
  return (
    <section className="px-6 pt-8 pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-content">
        <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-neutral-950">
          {/* The hero clip, echoed as ambience. motion-reduce falls back to the
              near-black ground, which the gradients already assume. */}
          <video
            className="absolute inset-0 size-full scale-105 object-cover brightness-125 contrast-105 motion-reduce:hidden"
            src="/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          {/* Two-step scrim: a flat dim on mobile (text sits over the middle of
              the frame), a left-to-right ramp from md up so the picture only
              survives beside the copy. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-neutral-950/85 md:bg-gradient-to-r md:from-neutral-950 md:via-neutral-950/75 md:via-40% md:to-neutral-950/0"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-neutral-950/30"
          />
          {/* One brand glow, low and left, so the card is unmistakably ours. */}
          <div
            aria-hidden
            className="absolute -bottom-32 -left-24 -z-10 size-96 rounded-full bg-brand/25 blur-3xl"
          />

          <div className="relative flex min-h-[24rem] flex-col justify-center gap-6 p-8 sm:p-12 md:min-h-[28rem] md:max-w-xl md:p-16">
            <h2 className="text-4xl font-medium tracking-tight text-balance text-white md:text-5xl">
              Start building today
            </h2>
            <p className="max-w-md text-lg text-balance text-neutral-300">
              Bring a Raspberry Pi 5 and a camera; the platform handles the
              rest. Dev kits are on the way.
            </p>
            <div className="mt-2 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
              <Button variant="brand" size="xl" asChild>
                <a href={`${consoleUrl}/signup`}>
                  Get started
                  <ArrowRight data-icon="inline-end" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
                asChild
              >
                <a href={docsUrl}>Read the docs</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
