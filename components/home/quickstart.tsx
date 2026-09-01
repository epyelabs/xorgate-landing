import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section, SectionHeading, masks } from "@/components/section"
import { LazyRippleGrid } from "@/components/three/lazy"
import { cn } from "@/lib/utils"
import { TerminalBlock } from "@/components/terminal-block"
import { docsUrl } from "@/lib/site"

// The developer journey, told simply: four numbered steps in a row, then the
// provisioning terminal they lead to — the strongest real product moment we
// have (content.md). The section heading closes rather than opens (user
// decision): the steps carry the entry, the h2 lands as the summary the CTA
// answers. Static on purpose — no interactive panel earns its place here.
// Every claim below is on the "shipping today" list in the plan's guardrails;
// the SDKs and dev kits carry their "in development" label.

const steps: { title: string; body: string }[] = [
  {
    title: "Bring a device",
    body: "A Raspberry Pi 4/5 and a CSI camera are enough to start. The agent runs on Linux and gates off whatever the board does not have.",
  },
  {
    title: "Claim it from the console",
    body: "Register the device into a workspace and the console hands back a one-time code and a cli command to copy and paste.",
  },
  {
    title: "Stream it live",
    body: "Telemetry arrives GPS, IMU, cellular, and system. Alongside live WebRTC video from each camera, seconds after the agent starts.",
  },
  {
    title: "Build on the API",
    body: "Everything the console does rides the REST API: history, replay, media sessions, no-code workflows. SDKs are also available",
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
      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col gap-3 rounded-xl border bg-card p-6"
          >
            <span className="font-mono text-sm text-brand-strong">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-medium">{step.title}</h3>
            <p className="text-base text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <Button variant="outline" size="xl" asChild>
          <a href={`${docsUrl}/getting-started/quickstart`}>
            Read the quickstart
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </Section>
  )
}
