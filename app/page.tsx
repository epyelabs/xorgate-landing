import { Reveal } from "@/components/reveal"
import { CtaBand } from "@/components/home/cta-band"
import { HardwareTeaser } from "@/components/home/hardware-teaser"
import { HeroVideo } from "@/components/home/hero-video"
import { Quickstart } from "@/components/home/quickstart"
import { UseCaseTeaser } from "@/components/home/use-case-teaser"
import { Workflows } from "@/components/home/workflows"

// Home tells the developer journey in one scroll: see it (hero), start it
// (quickstart), make it think (workflows), what others build (use cases),
// the hardware to buy (Daedalus), go (CTA).
export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <Reveal>
        <Quickstart />
      </Reveal>
      <Reveal>
        <Workflows />
      </Reveal>
      <Reveal>
        <UseCaseTeaser />
      </Reveal>
      <Reveal>
        <HardwareTeaser />
      </Reveal>
      <CtaBand />
    </>
  )
}
