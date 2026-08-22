import type { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Check,
  CircuitBoard,
  Package,
  PlugZap,
  RadioTower,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "@/components/code-block"
import {
  QuickstartSteps,
  type QuickstartStep,
} from "@/components/home/quickstart-steps"
import { Section, SectionHeading } from "@/components/section"
import { TerminalBlock } from "@/components/terminal-block"
import { docsUrl } from "@/lib/site"
import { telemetrySnippet } from "@/lib/snippets"

// The developer journey, styled after the wendy.dev step layout (plan docs:
// Section 2.png): dark visual panel left, numbered steps right. Clicking a
// step swaps the panel; each visual depicts the real product moment (kit
// contents, provisioning terminal, Active Streams, a workflow run, the API).

// Shared dark shell so every panel swap keeps the same frame. Code reads as
// code: deliberately dark in both themes, like TerminalBlock/CodeBlock.
function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-neutral-950 p-5">
      {children}
    </div>
  )
}

function PanelChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] text-neutral-400">
      {children}
    </span>
  )
}

// Kit contents mirror the hardware page (Daedalus is in development; keep
// wording non-final per content.md guardrails).
const kitItems = [
  {
    icon: CircuitBoard,
    label: "Daedalus base board",
    detail: "Raspberry Pi CM5",
  },
  { icon: Camera, label: "Two cameras", detail: "stereo arrangement" },
  { icon: RadioTower, label: "Modem + antenna", detail: "LTE, assisted GNSS" },
  { icon: Package, label: "Enclosure", detail: "with camera mounts" },
  { icon: PlugZap, label: "USB-C power supply", detail: "5 V / 5 A" },
]

const hardwarePanel = (
  <Panel>
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-neutral-400">
        daedalus dev kit
      </span>
      <PanelChip>In development</PanelChip>
    </div>
    <ul className="divide-y divide-white/5">
      {kitItems.map((item) => (
        <li key={item.label} className="flex items-center gap-3 py-2.5">
          <item.icon className="size-4 text-neutral-500" strokeWidth={1.5} />
          <span className="text-sm text-neutral-200">{item.label}</span>
          <span className="ml-auto text-xs text-neutral-500">
            {item.detail}
          </span>
        </li>
      ))}
    </ul>
    <p className="mt-auto text-sm text-neutral-500">
      No kit? A Raspberry Pi 5 with a camera is enough to start today.
    </p>
  </Panel>
)

const claimPanel = (
  <Panel>
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
    <p className="mt-auto text-sm text-neutral-500">
      Zero-touch: the claim code is single-use and expires in 15 minutes. The
      device provisions its own certificate; no credentials to copy around.
    </p>
  </Panel>
)

// Metric names and units are the real wire names (group.field); values match
// the docs quickstart snippet.
const liveMetrics = [
  { metric: "gps.speed", value: "12.4 km/h" },
  { metric: "gps.lat", value: "45.4215°" },
  { metric: "lte.rssi", value: "-67 dBm" },
  { metric: "system.cpu_temp", value: "51.2 °C" },
]

const livePanel = (
  <Panel>
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-neutral-400">
        daedalus-dev-01 · Active Streams
      </span>
      <span className="flex items-center gap-1.5 text-[11px] text-neutral-400">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Online
      </span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {["cam0", "cam1"].map((cam) => (
        <div
          key={cam}
          className="relative flex aspect-video items-center justify-center rounded-lg border border-white/10 bg-neutral-900"
        >
          <Video className="size-5 text-neutral-600" strokeWidth={1.5} />
          <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-neutral-500">
            {cam} · WebRTC
          </span>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3">
      {liveMetrics.map((entry) => (
        <div
          key={entry.metric}
          className="rounded-lg border border-white/5 px-3 py-2"
        >
          <div className="font-mono text-[11px] text-neutral-500">
            {entry.metric}
          </div>
          <div className="text-sm text-neutral-200">{entry.value}</div>
        </div>
      ))}
    </div>
    <p className="mt-auto text-sm text-neutral-500">
      Telemetry streams at 1 Hz: GPS, cellular, motion, and system health.
    </p>
  </Panel>
)

// Node ids are real catalog ids; session_completed and "Run now" are the real
// trigger names from the attachment model.
const runSteps = [
  { node: "video.decode_sample", result: "48 frames" },
  { node: "model.object_detection", result: "2 detections" },
  { node: "logic.detection_gate", result: "pass" },
  { node: "output.event", result: "person_detected", highlight: true },
]

const workflowPanel = (
  <Panel>
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-neutral-400">person-alerts</span>
      <PanelChip>v3 · attached</PanelChip>
    </div>
    <div className="font-mono text-xs text-neutral-500">
      run #128 · trigger: session completed
    </div>
    <ul className="divide-y divide-white/5 font-mono text-sm">
      {runSteps.map((entry) => (
        <li key={entry.node} className="flex items-center gap-3 py-2.5">
          <Check className="size-3.5 text-brand-green" strokeWidth={2} />
          <span className="text-neutral-300">{entry.node}</span>
          <span
            className={
              entry.highlight
                ? "ml-auto text-brand-green"
                : "ml-auto text-neutral-500"
            }
          >
            {entry.result}
          </span>
        </li>
      ))}
    </ul>
    <p className="mt-auto text-sm text-neutral-500">
      Runs also fire as each chunk uploads, on a schedule, on a telemetry
      condition — or on demand with Run now.
    </p>
  </Panel>
)

const apiPanel = (
  <Panel>
    <CodeBlock
      code={telemetrySnippet}
      lang="bash"
      filename="telemetry/latest"
      className="border-white/10"
    />
    <p className="mt-auto text-sm text-neutral-500">
      Everything the console does rides this API. Full OpenAPI reference in the
      docs.
    </p>
  </Panel>
)

const steps: QuickstartStep[] = [
  {
    id: "hardware",
    title: "Get the hardware",
    body: "Order the Daedalus Dev Kit, or start with a Raspberry Pi 5 you already own — the device agent runs on a plain Pi today, no Compute Module required.",
    panel: hardwarePanel,
  },
  {
    id: "claim",
    title: "Claim it from the console",
    body: "Register a device in the console and copy the one-time install command. One code, one command: the device claims itself, provisions its own certificate, and joins your fleet.",
    panel: claimPanel,
  },
  {
    id: "live",
    title: "Watch it live",
    body: "Open the device's Active Streams tab: live WebRTC video from every camera and 1 Hz telemetry — GPS, signal, motion, system — seconds after boot.",
    panel: livePanel,
  },
  {
    id: "workflows",
    title: "Attach AI workflows",
    body: "Compose detection, vision-language, and telemetry nodes in the visual editor, then simulate against a recorded session before anything ships. Attach the published workflow and runs fire on your triggers.",
    panel: workflowPanel,
  },
  {
    id: "build",
    title: "Build your own thing",
    body: (
      <>
        Everything in the console rides the REST API: devices, telemetry,
        sessions, workflow runs. Start from the{" "}
        <a href={docsUrl} className="text-brand-strong hover:underline">
          documentation
        </a>{" "}
        or browse the{" "}
        <Link href="/use-cases" className="text-brand-strong hover:underline">
          use cases
        </Link>{" "}
        for inspiration. JS and React SDKs are in development.
      </>
    ),
    panel: apiPanel,
  },
]

export function Quickstart() {
  return (
    <Section accent="dots-tr">
      <SectionHeading
        title="From bench to edge in minutes"
        intro="No firmware to write, no infrastructure to stand up. One command on the device and the platform takes it from there."
      />
      <QuickstartSteps steps={steps} />
      <div className="mt-20 flex justify-center">
        <Button variant="outline" size="xl" asChild>
          <a href={docsUrl}>
            Explore Xorgate
            <ArrowRight data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </Section>
  )
}
