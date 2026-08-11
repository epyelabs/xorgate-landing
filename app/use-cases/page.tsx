import type { Metadata } from "next"
import { Section, SectionHeading } from "@/components/section"

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "What teams build on Xorgate: asset monitoring, smart home, agriculture, sports analysis, and more.",
}

export default function UseCasesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Use Cases"
        title="What people build on Xorgate"
        intro="Stories from asset monitoring to farm automation. This page is being assembled."
      />
    </Section>
  )
}
