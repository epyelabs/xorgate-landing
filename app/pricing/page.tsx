import type { Metadata } from "next"
import { Section, SectionHeading } from "@/components/section"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for every fleet size, from first prototype to production.",
}

export default function PricingPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Pricing"
        title="Simple plans for every fleet size"
        intro="From a single prototype on your desk to a production fleet. This page is being assembled."
      />
    </Section>
  )
}
