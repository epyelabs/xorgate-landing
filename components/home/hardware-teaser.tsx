import Link from "next/link"
import { ArrowRight, CircuitBoard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScreenshotPlaceholder } from "@/components/screenshot-placeholder"
import { Section, SectionHeading } from "@/components/section"

export function HardwareTeaser() {
  return (
    <Section className="border-t">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Hardware"
            title="Meet Daedalus"
            intro="A developer-leaning carrier board for the Raspberry Pi CM5: dual cameras in a stereo arrangement, cellular and GNSS, an IMU, and a standard 40-pin header. Shipping as a dev kit with everything you need to unbox, provision, and stream."
            className="mb-6"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="xl" asChild>
              <Link href="/hardware">
                Explore the hardware
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Badge variant="secondary">In development</Badge>
          </div>
        </div>
        {/* Swap for the Daedalus 3D render when provided (content.md shot list #1). */}
        <ScreenshotPlaceholder
          icon={CircuitBoard}
          label="Daedalus board render"
        />
      </div>
    </Section>
  )
}
