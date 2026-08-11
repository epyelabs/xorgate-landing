import type { ReactNode } from "react"
import Link from "next/link"
import { RefreshCw, Satellite, WifiOff } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/section"
import { TerminalBlock } from "@/components/terminal-block"
import { docsUrl } from "@/lib/site"

// The developer journey, styled after the wendy.dev step layout (plan docs:
// Section 2.png): dark visual panel left, numbered steps right.

const steps: { title: string; body: ReactNode }[] = [
  {
    title: "Get the hardware",
    body: "Order the Daedalus Dev Kit, or use a Raspberry Pi you already own. Any Pi 5 works; it doesn't need to be a Compute Module.",
  },
  {
    title: "Assemble and power up",
    body: "Seat the compute module, mount the cameras, insert the SIM, plug in USB-C. No soldering, no toolchains.",
  },
  {
    title: "Claim it from the console",
    body: "Provision a device in the console and copy the one-line install command. The device certifies itself and joins your fleet.",
  },
  {
    title: "Watch it live",
    body: "Open the device's Active Streams tab: live video over WebRTC and telemetry at one hertz, seconds after boot.",
  },
  {
    title: "Build your own thing",
    body: (
      <>
        Go beyond the console with the REST API and SDKs. Start from the{" "}
        <a href={docsUrl} className="text-brand-strong hover:underline">
          documentation
        </a>{" "}
        or browse the{" "}
        <Link href="/use-cases" className="text-brand-strong hover:underline">
          use cases
        </Link>{" "}
        for inspiration.
      </>
    ),
  },
]

const proofs: { icon: LucideIcon; text: string }[] = [
  { icon: WifiOff, text: "Records through dead zones, uploads on reconnect" },
  { icon: Satellite, text: "Assisted GPS: cold start to fix in about 90 s" },
  { icon: RefreshCw, text: "Cellular recovers on its own, no truck rolls" },
]

export function Quickstart() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Quickstart"
        title="From unboxing to live stream"
        intro="No firmware to write, no infrastructure to stand up. One command on the device and the platform takes it from there."
      />
      {/* Explicit grid-cols-1: the implicit mobile track is `auto` and would
          grow to the terminal's unbreakable line width; minmax(0,1fr) clamps. */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-950 p-5">
          <TerminalBlock
            className="border-white/10"
            lines={[
              "# Paste the command from the console:",
              "$ curl -s https://api.xorgate.io/get/K7QF4M2P -o install.sh",
              "$ sudo bash install.sh",
              "  Claiming device........ done",
              "  Installing agent....... done",
              "  Starting streams....... done",
              "# Device online. Open Active Streams to watch it live.",
            ]}
          />
          {/* Swap for the dev kit onboarding animation when it exists. */}
          <div className="flex aspect-video items-center justify-center rounded-xl border border-white/10 bg-neutral-900">
            <span className="text-sm text-neutral-500">
              Dev kit onboarding animation
            </span>
          </div>
        </div>
        <ol className="flex flex-col divide-y divide-border">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-6 py-5 first:pt-0 last:pb-0"
            >
              <span className="pt-0.5 font-mono text-sm text-brand-strong">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-medium">{step.title}</h3>
                <p className="mt-1 text-base text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:gap-10">
        {proofs.map((proof) => (
          <p
            key={proof.text}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <proof.icon
              className="size-4 shrink-0 text-brand-strong"
              strokeWidth={1.5}
            />
            {proof.text}
          </p>
        ))}
      </div>
    </Section>
  )
}
