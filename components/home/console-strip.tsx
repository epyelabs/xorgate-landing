import { Boxes, MapPin, Waypoints } from "lucide-react"
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder"
import { Section, SectionHeading } from "@/components/section"

// Placeholders until real light-theme console captures land (content.md shot
// list items 5a-5c).
const shots = [
  {
    icon: Boxes,
    label: "Devices",
    caption: "Your fleet at a glance: status, claim codes, and remote actions.",
  },
  {
    icon: MapPin,
    label: "Live view",
    caption: "Live video and location, straight from the device over WebRTC.",
  },
  {
    icon: Waypoints,
    label: "Workflow editor",
    caption:
      "Compose AI pipelines in the visual editor, then simulate before you deploy.",
  },
]

export function ConsoleStrip() {
  return (
    <Section className="border-t">
      <SectionHeading
        eyebrow="Console"
        title="Watch the whole fleet live"
        intro="Telemetry over MQTT and video over WebRTC land in the console within seconds of a device coming online."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {shots.map((shot) => (
          <figure key={shot.label} className="flex flex-col gap-3">
            <ScreenshotPlaceholder icon={shot.icon} label={shot.label} />
            <figcaption className="text-sm text-muted-foreground">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
