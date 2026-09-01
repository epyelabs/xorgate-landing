import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/section"
import { LazyDaedalusModel } from "@/components/three/lazy"

export function HardwareTeaser() {
  return (
    <Section surface="shell" accent="dots-tr">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            title="Meet Daedalus CM5"
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
          </div>
        </div>
        {/* Board CAD model (content.md shot list #1) shaded from the STL:
            sways on its own and turns under the pointer. */}
        <LazyDaedalusModel
          views={[{ id: "board", label: "Board", src: "/Daedalus%20CM5.stl" }]}
          label="The Daedalus carrier board: two camera modules, an IMU, a 40-pin header, a USB-C port, and a heatsinked Raspberry Pi CM5 behind"
          className="aspect-[16/9] w-full"
        />
      </div>
    </Section>
  )
}
