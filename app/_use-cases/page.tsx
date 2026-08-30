import type { Metadata } from "next"
import {
  ArrowRight,
  HeartPulse,
  House,
  Mountain,
  Sprout,
  Truck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section } from "@/components/section"
import { contactEmail } from "@/lib/site"

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "What teams build on Xorgate: asset monitoring, smart home, agriculture, sports analysis, and more.",
}

type Story = {
  icon: LucideIcon
  industry: string
  title: string
  body: string
  chips: string[]
}

const stories: Story[] = [
  {
    icon: Truck,
    industry: "Logistics",
    title: "Asset monitoring for off-grid fleets",
    body: "A camera and GPS unit on every vehicle, streaming location and telemetry over cellular. Workflows watch driving behavior: sudden stops from the accelerometer, speed-limit compliance by matching the GPS track against road data. When something happens, there's an event with the footage to prove it.",
    chips: [
      "GPS + IMU telemetry",
      "Speed-limit connector",
      "Kalman smoothing",
      "Geofence",
      "Events",
    ],
  },
  {
    icon: House,
    industry: "Smart home",
    title: "Air quality and video monitoring",
    body: "A device watching the spaces you care about, pairing live video with readings from external air-quality sensors. A vision-language model answers plain questions about what the camera sees, and telemetry conditions trigger alerts when readings drift.",
    chips: [
      "Live video",
      "VLM node",
      "Telemetry conditions",
      "External sensors",
    ],
  },
  {
    icon: Sprout,
    industry: "Agriculture",
    title: "Farm monitoring and irrigation",
    body: "A Daedalus kit as the field gateway: camera, cellular uplink, and weather sensing, with soil-moisture probes reporting in wirelessly. Scheduled workflows fuse the readings and decide when the sprinklers run, and you check on the field from anywhere with live video.",
    chips: [
      "Daedalus dev kit",
      "Schedule triggers",
      "Sensor fusion",
      "Irrigation control",
    ],
  },
  {
    icon: Mountain,
    industry: "Sports",
    title: "Snowboarding ride analysis",
    body: "An action camera plus motion sensors record every run through dead zones on the hill. Back home, scrub the replay with video and telemetry in lockstep: edge angles from the IMU, speed from GPS, and the exact frame where the landing went sideways.",
    chips: ["On-device recording", "Replay", "IMU + GPS", "Flex sensors"],
  },
  {
    icon: HeartPulse,
    industry: "Health",
    title: "Exploring: what would you build?",
    body: "Health and wellness sensing is on our radar, and we'd rather shape it with the people who need it. If you're building something in this space, tell us what the hardware and the workflows should look like.",
    chips: [],
  },
]

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        accent="dots-tr"
        eyebrow="Use Cases"
        title="What people build on Xorgate"
        intro="Stories of sensor-driven systems on one platform: the same agent, the same APIs, the same workflows, pointed at very different problems."
      />
      <Reveal>
        <Section className="pt-0 md:pt-0" accent="hatch-bl">
          <div className="grid gap-4 md:grid-cols-2">
            {stories.map((story) => (
              <article
                key={story.title}
                className="flex flex-col rounded-xl border bg-card p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <story.icon
                    className="size-6 text-brand-strong"
                    strokeWidth={1.5}
                  />
                  <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    {story.industry}
                  </span>
                </div>
                <h2 className="text-xl font-medium">{story.title}</h2>
                <p className="mt-2 text-base text-muted-foreground">
                  {story.body}
                </p>
                {story.chips.length > 0 ? (
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {story.chips.map((chip) => (
                      <Badge key={chip} variant="secondary">
                        {chip}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <div className="mt-auto pt-6">
                    <Button variant="outline" size="lg" asChild>
                      <a
                        href={`mailto:${contactEmail}?subject=Health%20use%20case`}
                      >
                        Tell us your idea
                        <ArrowRight data-icon="inline-end" />
                      </a>
                    </Button>
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>
      </Reveal>
    </>
  )
}
