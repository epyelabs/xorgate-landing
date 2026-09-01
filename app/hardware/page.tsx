import type { Metadata } from "next"
import Image from "next/image"
import {
  Antenna,
  ArrowRight,
  Box,
  Camera,
  CircuitBoard,
  Cpu,
  Plug,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { Reveal } from "@/components/reveal"
import { Section, SectionHeading } from "@/components/section"
import { SpecTable } from "@/components/spec-table"
import { contactEmail, docsUrl } from "@/lib/site"
import daedalusBoard from "@/public/daedalus-board.png"
import daedalusDashboard from "@/public/daedalus-dashboard.png"
import daedalusEnclosure from "@/public/daedalus-enclosure.png"
import daedalusExplode from "@/public/daedalus-explode.png"

export const metadata: Metadata = {
  title: "Hardware",
  description:
    "Xorgate carrier boards and developer kits: the Daedalus dev kit, with custom enterprise builds available.",
}

const kitContents: { icon: LucideIcon; label: string; detail: string }[] = [
  {
    icon: CircuitBoard,
    label: "Daedalus base board",
    detail: "Carrier board for the Raspberry Pi CM5",
  },
  {
    icon: Camera,
    label: "Two cameras",
    detail: "Stereo arrangement, 75 mm baseline",
  },
  {
    icon: Antenna,
    label: "Modem and antenna",
    detail: "SIM7600G cellular module with LTE + GNSS antenna",
  },
  {
    icon: Cpu,
    label: "Raspberry Pi CM5",
    detail: "The compute module, ready to seat",
  },
  {
    icon: Box,
    label: "Enclosure",
    detail: "Case with camera mounts",
  },
  {
    icon: Plug,
    label: "Power supply",
    detail: "5 V / 5 A USB-C, sized for dual-camera streaming",
  },
]

const specRows = [
  { label: "Compute", values: ["Raspberry Pi Compute Module 5"] },
  {
    label: "Cameras",
    values: ["Dual MIPI CSI-2, 4-lane, aligned for a 75 mm stereo baseline"],
  },
  {
    label: "Cellular",
    values: ["M.2 B-key slot for the SIM7600 family, nano SIM"],
  },
  {
    label: "GNSS",
    values: ["Multi-constellation via the cellular module, assisted startup"],
  },
  { label: "IMU", values: ["BNO086 (planned)"] },
  {
    label: "Expansion",
    values: ["40-pin GPIO header, microSD slot, fan port, RTC coin cell"],
  },
  { label: "Power", values: ["USB-C 5 V, 5 A supply recommended"] },
  { label: "Indicators", values: ["Power, activity, WWAN"] },
]

export default function HardwarePage() {
  return (
    <>
      <PageHero
        accent="dots-tr"
        eyebrow="Hardware"
        title="Daedalus Dev Kit"
        intro="A developer-leaning carrier board for the Raspberry Pi CM5, packaged with everything you need to unbox, provision, and stream. Easy to extend, easy to service, and friendly to the standard Raspberry Pi ecosystem."
      >
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Button variant="brand" size="xl" asChild>
            <a
              href={`mailto:${contactEmail}?subject=Daedalus%20dev%20kit%20waitlist`}
            >
              Join the waitlist
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Badge variant="secondary">In development</Badge>
        </div>
      </PageHero>

      <Reveal>
        <Section className="pt-0 md:pt-0">
          {/* Exploded CAD render (content.md shot list #1). Transparent PNG,
              so it sits straight on the page ground with no frame. */}
          <Image
            src={daedalusExplode}
            alt="Exploded view of the Daedalus dev kit: enclosure front, two camera modules, the carrier board, the Raspberry Pi CM5, and the rear cover"
            sizes="(min-width: 960px) 896px, 100vw"
            className="mx-auto h-auto w-full max-w-4xl"
            priority
          />
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="hatch-bl">
          <SectionHeading
            eyebrow="In the box"
            title="Unbox, provision, stream"
            intro="One kit, no sourcing. Seat the CM5, mount the cameras, run the install command, and the device is live in your fleet."
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {kitContents.map((item) => (
              <div key={item.label} className="rounded-xl border bg-card p-6">
                <item.icon
                  className="mb-3 size-6 text-brand-strong"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-medium">{item.label}</h3>
                <p className="mt-1 text-base text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="dots-tr">
          <SectionHeading
            eyebrow="Enterprise"
            title="Proven in the field, customized for your program"
            intro="The hardware behind Daedalus validated the whole stack in the field: two weeks on a vehicle dashboard with dual-camera streaming and telemetry over LTE, dropping out gracefully in dead zones and recovering on its own. For enterprise programs, we build custom carrier boards and bespoke sensor combinations on the same platform."
          />
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {/* Board, enclosure, and dashboard-mount CAD renders (content.md
                shot list #2, #3, #4): transparent PNGs, framed identically so
                the row reads as one set. */}
            <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted p-6">
              <Image
                src={daedalusBoard}
                alt="The Daedalus carrier board: two camera modules, an IMU, a 40-pin header, a USB-C port, and a heatsinked Raspberry Pi CM5 behind"
                sizes="(min-width: 768px) 352px, 100vw"
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>
            <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted p-6">
              <Image
                src={daedalusEnclosure}
                alt="The assembled Daedalus enclosure: a grey rectangular housing with two camera lenses on the front and a USB-C port on the side"
                sizes="(min-width: 768px) 352px, 100vw"
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>
            <div className="flex aspect-video items-center justify-center rounded-xl border bg-muted p-6">
              <Image
                src={daedalusDashboard}
                alt="The Daedalus enclosure on a suction-cup dashboard mount, its two camera lenses aimed forward through the windshield"
                sizes="(min-width: 768px) 352px, 100vw"
                className="h-auto max-h-full w-auto max-w-full"
              />
            </div>
          </div>
          <Button variant="outline" size="xl" asChild>
            <a
              href={`mailto:${contactEmail}?subject=Enterprise%20hardware%20inquiry`}
            >
              Talk to us about a custom build
            </a>
          </Button>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="hatch-bl">
          <SectionHeading eyebrow="Specs" title="Daedalus 1.0 at a glance" />
          <SpecTable columns={["Daedalus 1.0"]} rows={specRows} />
          <p className="mt-4 text-sm text-muted-foreground">
            Daedalus specifications are preliminary and may change before
            release.
          </p>
        </Section>
      </Reveal>

      <Reveal>
        <Section className="border-t" accent="dots-tr">
          <SectionHeading
            eyebrow="Roadmap"
            title="More boards on the way"
            intro="Daedalus is the first developer board, not the last. Upcoming boards and variants will support other compute modules, including Radxa, Orange Pi, and the Jetson Orin Nano."
          />
          <div className="rounded-xl border bg-brand-wash p-8">
            <h3 className="text-xl font-medium">
              Start today with hardware you already own
            </h3>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              The device agent runs on a plain Raspberry Pi 5 right now, and
              collectors self-gate on any 64-bit Linux, so a missing sensor
              never breaks the device. The dev kit makes it turnkey; it isn't a
              prerequisite.
            </p>
            <Button variant="ghost" size="lg" className="mt-4" asChild>
              <a href={`${docsUrl}/docs/device-sdk/installation`}>
                Read the installation guide
                <ArrowRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </Section>
      </Reveal>
    </>
  )
}
