import type { Metadata } from "next"
import { Section, SectionHeading } from "@/components/section"

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Xorgate carrier boards and developer kits: the Daedalus dev kit and the Argus enterprise line.",
}

export default function HardwarePage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Hardware"
        title="Boards and developer kits"
        intro="The Daedalus developer kit and the Argus enterprise line. This page is being assembled; the platform docs and console are live today."
      />
    </Section>
  )
}
