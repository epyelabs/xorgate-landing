import Link from "next/link"
import { ArrowRight, Mountain, Sprout, Truck } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/section"

const cases: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Truck,
    title: "Asset monitoring",
    body: "Track vehicles and equipment off-grid: GPS, driving behavior, sudden stops, and speed-limit compliance with live video when you need eyes on.",
  },
  {
    icon: Sprout,
    title: "Agriculture",
    body: "A camera and LTE gateway in the field, wireless soil and weather sensors reporting in, and workflows that decide when the irrigation runs.",
  },
  {
    icon: Mountain,
    title: "Sports analysis",
    body: "Record runs with synchronized video and motion data, then scrub through the replay to see exactly what happened at every moment.",
  },
]

export function UseCaseTeaser() {
  return (
    <Section className="border-t">
      <SectionHeading
        eyebrow="Use Cases"
        title="What people build on Xorgate"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {cases.map((useCase) => (
          <Card key={useCase.title}>
            <CardHeader>
              <useCase.icon
                className="mb-2 size-6 text-brand-strong"
                strokeWidth={1.5}
              />
              <CardTitle className="text-xl font-medium">
                {useCase.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{useCase.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button variant="ghost" size="lg" asChild>
          <Link href="/use-cases">
            See all use cases
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </Section>
  )
}
