import type { Metadata } from "next"
import { Section, SectionHeading } from "@/components/section"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates from the Xorgate team.",
}

export default function BlogPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Blog"
        title="Articles and updates"
        intro="Nothing published yet. Posts on the platform, hardware, and field deployments are coming."
      />
    </Section>
  )
}
