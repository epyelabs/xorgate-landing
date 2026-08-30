import type { Metadata } from "next"
import { Cpu, Radio, Waypoints } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder"
import { Section } from "@/components/section"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates from the Xorgate team.",
}

// Placeholder grid until real posts exist. Topics are drawn from work that has
// actually happened, so the first articles write themselves.
const upcoming: { icon: LucideIcon; title: string; teaser: string }[] = [
  {
    icon: Radio,
    title: "Field notes: two weeks of LTE streaming on a dashboard",
    teaser:
      "What a vehicle deployment taught us about dead zones, brownouts, and modem recovery.",
  },
  {
    icon: Cpu,
    title: "Anatomy of zero-touch provisioning",
    teaser:
      "How one claim code turns a blank Raspberry Pi into a certified, streaming fleet device.",
  },
  {
    icon: Waypoints,
    title: "Composing AI workflows over live sensor data",
    teaser:
      "From detection models to vision-language nodes: how pipelines run against streams and recordings.",
  },
]

export default function BlogPage() {
  return (
    <>
      <PageHero
        accent="dots-tr"
        eyebrow="Blog"
        title="Articles and updates"
        intro="Nothing published yet. Here's what we're writing about first."
      />
      <Reveal>
        <Section className="pt-0 md:pt-0" accent="hatch-bl">
          <div className="grid gap-4 md:grid-cols-3">
            {upcoming.map((post) => (
              <article key={post.title} className="flex flex-col gap-3">
                <ScreenshotPlaceholder icon={post.icon} label="" />
                <Badge variant="secondary" className="w-fit">
                  Coming soon
                </Badge>
                <h2 className="text-xl font-medium">{post.title}</h2>
                <p className="text-base text-muted-foreground">{post.teaser}</p>
              </article>
            ))}
          </div>
        </Section>
      </Reveal>
    </>
  )
}
