import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/home/cta-band"
import { HardwareTeaser } from "@/components/home/hardware-teaser"
import { Hero } from "@/components/home/hero"
import { Quickstart } from "@/components/home/quickstart"
import { Workflows } from "@/components/home/workflows"

// Home tells the developer journey in one scroll: see it (hero), start it
// (quickstart), make it think (workflows), the hardware to buy (Daedalus),
// go (CTA). The use-cases teaser (components/home/use-case-teaser.tsx) and
// the /use-cases, /pricing, and /blog routes (app/_use-cases, app/_pricing,
// app/_blog) are parked until the content lands.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <Quickstart />
      </Reveal>
      <Reveal>
        <Workflows />
      </Reveal>
      <Reveal>
        <HardwareTeaser />
      </Reveal>
      <CtaBand />
    </>
  )
}
