import { Reveal } from "@/components/reveal"
import { CodeMoment } from "@/components/home/code-moment"
import { ConsoleStrip } from "@/components/home/console-strip"
import { CtaBand } from "@/components/home/cta-band"
import { FieldProven } from "@/components/home/field-proven"
import { HardwareTeaser } from "@/components/home/hardware-teaser"
import { Hero } from "@/components/home/hero"
import { Pillars } from "@/components/home/pillars"
import { UseCaseTeaser } from "@/components/home/use-case-teaser"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <Pillars />
      </Reveal>
      <Reveal>
        <CodeMoment />
      </Reveal>
      <Reveal>
        <FieldProven />
      </Reveal>
      <Reveal>
        <ConsoleStrip />
      </Reveal>
      <Reveal>
        <HardwareTeaser />
      </Reveal>
      <Reveal>
        <UseCaseTeaser />
      </Reveal>
      <CtaBand />
    </>
  )
}
