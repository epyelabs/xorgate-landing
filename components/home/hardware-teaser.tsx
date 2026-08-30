import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/section"
import daedalusBoard from "@/public/daedalus-board.png"

export function HardwareTeaser() {
  return (
    <Section className="border-t" accent="hatch-bl">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
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
        {/* Board CAD render (content.md shot list #1). Transparent PNG, so
            it sits straight on the page ground with no frame. */}
        <Image
          src={daedalusBoard}
          alt="The Daedalus carrier board: two camera modules, an IMU, a 40-pin header, a USB-C port, and a heatsinked Raspberry Pi CM5 behind"
          sizes="(min-width: 768px) 552px, 100vw"
          className="h-auto w-full"
          priority={false}
        />
      </div>
    </Section>
  )
}
