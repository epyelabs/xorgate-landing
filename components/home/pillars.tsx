import { AppWindow, Cloud, Cpu } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/section"

const pillars: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Cpu,
    title: "A device agent, not a firmware project",
    body: "The agent ships telemetry at 1 Hz (IMU, GPS, cellular, system health), streams live WebRTC video per camera, records through dead zones, recovers the modem on its own, and takes over-the-air updates with rollback.",
  },
  {
    icon: Cloud,
    title: "Fleet, data, and AI in one API",
    body: "Zero-touch onboarding, telemetry history and replay, recordings indexed the moment they upload, and a workflow engine that runs vision models and VLMs against your streams. Organizations, workspaces, and roles are built in.",
  },
  {
    icon: AppWindow,
    title: "Console today, SDKs on the way",
    body: "Live dashboards, maps, replay scrubbing, and a visual workflow editor in the console. A REST API with an OpenAPI playground today; JavaScript and React SDKs are in development.",
  },
]

export function Pillars() {
  return (
    <Section className="border-t">
      <SectionHeading
        eyebrow="Platform"
        title="One stack, from sensor to insight"
        intro="Every layer is designed to work together out of the box, so a prototype on your desk and a fleet in the field run the same way."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Card key={pillar.title}>
            <CardHeader>
              <pillar.icon
                className="mb-2 size-6 text-brand-strong"
                strokeWidth={1.5}
              />
              <CardTitle className="text-xl font-medium">
                {pillar.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{pillar.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
