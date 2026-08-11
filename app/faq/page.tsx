import type { Metadata } from "next"
import { Section, SectionHeading } from "@/components/section"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about the Xorgate platform.",
}

export default function FaqPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        intro="This page is being assembled. In the meantime, the documentation covers most of it."
      />
    </Section>
  )
}
