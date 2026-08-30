import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeading, masks } from "@/components/section"
import { LazyRippleGrid } from "@/components/three/lazy"
import { cn } from "@/lib/utils"
import { TerminalBlock } from "@/components/terminal-block"
import { docsUrl } from "@/lib/site"

// The developer journey, told simply: one terminal showing the single
// command that onboards a device, then four numbered steps in a row. Static
// on purpose; the copy is a placeholder until the final content lands, so
// there is nothing here worth an interactive panel yet.

const steps: { title: string; body: string }[] = [
  {
    title: "Get a device",
    body: "A Raspberry Pi 5 with a camera is enough to start. Dev kits are on the way.",
  },
  {
    title: "Claim it from the console",
    body: "Register the device, copy the one-time install command, run it once.",
  },
  {
    title: "Watch it live",
    body: "Live video and telemetry show up in the console seconds after boot.",
  },
  {
    title: "Build on the API",
    body: "Everything the console does rides the REST API. Attach workflows, pull data, ship.",
  },
]

export function Quickstart() {
  return (
    <Section
      surface="shell"
      ornament={
        // Devices pinging in: the dot accent, but live, behind the terminal.
        <LazyRippleGrid className={cn("absolute inset-0 -z-10", masks.tr)} />
      }
    >
      <SectionHeading
        title="From bench to edge in minutes"
        intro="No firmware to write, no infrastructure to stand up. One command on the device and the platform takes it from there."
      />

      <TerminalBlock
        className="mx-auto max-w-3xl"
        lines={[
          "# Paste the command from the console:",
          "$ curl -s https://api.xorgate.io/get/K7QF4M2P | sudo bash",
          "  Claiming device........ done",
          "  Installing agent....... done",
          "  Starting streams....... done",
          "# Device online.",
        ]}
      />

      <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="font-mono text-sm text-brand-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-medium">{step.title}</h3>
            <p className="text-base text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 flex justify-center">
        <Button variant="outline" size="xl" asChild>
          <a href={docsUrl}>
            Read the docs
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </Section>
  )
}
