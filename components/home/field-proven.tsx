import { Activity, RefreshCw, Satellite, WifiOff } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/section"

const items: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: WifiOff,
    title: "A dead zone still records",
    body: "Losing cellular changes exactly one thing: the upload pauses. Capture continues, the backlog grows, and everything drains oldest-first when coverage returns.",
  },
  {
    icon: RefreshCw,
    title: "Recovers on its own",
    body: "An escalating recovery ladder takes the modem from a simple retry to a full reset. In field testing, telemetry and video resumed after signal loss with no manual intervention.",
  },
  {
    icon: Satellite,
    title: "Assisted GPS, fast fixes",
    body: "Four GNSS constellations plus QZSS, with predicted ephemeris and assisted startup. Measured cold starts on the reference device land around 90 seconds.",
  },
  {
    icon: Activity,
    title: "Glanceable in the field",
    body: "An RGB status LED tells you from across the yard whether a device is healthy, waiting on a GPS fix, running hot, or offline. A green heartbeat means all good.",
  },
]

export function FieldProven() {
  return (
    <Section className="border-t">
      <SectionHeading
        eyebrow="Built for the real world"
        title="Proven where the signal isn't"
        intro="Two weeks on a vehicle dashboard through dead zones, heat, and brownouts shaped how the whole stack behaves when conditions turn bad."
      />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <item.icon
              className="mt-1 size-5 shrink-0 text-brand-strong"
              strokeWidth={1.5}
            />
            <div>
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="mt-1 text-base text-muted-foreground">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
