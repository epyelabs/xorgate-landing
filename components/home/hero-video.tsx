import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TypingHeadline } from "@/components/typing-headline"
import { consoleUrl } from "@/lib/site"

// Full-screen video hero, content mid-center, typewriter headline. The
// floating navbar overlays this section (it is fixed, not in flow). The clip
// is a temporary stand-in (see plan docs).
export function HeroVideo() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-neutral-950">
      <video
        className="absolute inset-0 size-full object-cover motion-reduce:hidden"
        src="/hero-loop.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div aria-hidden className="absolute inset-0 bg-black/45" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center">
        <TypingHeadline
          phrases={["Sense the world.", "Stream it live.", "Make it think."]}
          className="text-[clamp(2rem,7vw,4.5rem)] font-medium tracking-tight text-white"
        />
        <p className="mt-5 max-w-xl text-base text-neutral-200 md:text-lg">
          Ready-made hardware, cellular streaming, and{" "}
          <span className="whitespace-nowrap">no-code AI workflows.</span>
        </p>
        <div className="mt-8 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <Button variant="brand" size="xl" asChild>
            <a href={`${consoleUrl}/signup`}>
              Try Cloud Console
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            asChild
          >
            <Link href="/hardware">Order Daedalus Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
