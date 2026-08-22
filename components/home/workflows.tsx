import { ArrowRight, FlaskConical, GitBranch, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/section"

// Node ids are the real catalog ids from the workflow engine; the two lanes
// mirror pipelines you can actually build in the editor today.
const lanes: { label: string; nodes: string[] }[] = [
  {
    label: "Vision",
    nodes: [
      "source.video",
      "video.decode_sample",
      "model.object_detection",
      "logic.detection_gate",
      "output.event",
    ],
  },
  {
    label: "Telemetry",
    nodes: [
      "source.telemetry",
      "telemetry.kalman",
      "telemetry.geofence",
      "logic.threshold",
      "output.event",
    ],
  },
]

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: GitBranch,
    title: "No code, all signal",
    body: "Drag nodes together in the visual editor: object detection, segmentation, and depth models; vision-language nodes that answer plain questions about the footage; telemetry math from Kalman filters to geofences. No training runs, no glue code.",
  },
  {
    icon: FlaskConical,
    title: "Simulate before you deploy",
    body: "Run a draft against a recorded session, an uploaded clip, a CSV, or your webcam without publishing anything. Publish versions when you're happy, and roll back when you're not; run history keeps the exact graph that ran.",
  },
  {
    icon: Zap,
    title: "Runs on your triggers",
    body: "When a recording completes, when a segment uploads, on a schedule, when telemetry crosses a condition, or on demand. Every run leaves a step-by-step trace with its events and captured data.",
  },
]

export function Workflows() {
  return (
    <Section className="border-t">
      <SectionHeading
        title="Your data is already here. Now make it think."
        intro="Everything a device sees and senses already lands in Xorgate: video, GPS, motion, signal. Point a no-code workflow at it and turn raw streams into detections, alerts, and answers, without standing up an ML pipeline."
      />
      <div className="mb-12 flex flex-col gap-4 overflow-x-auto rounded-xl border bg-muted/40 p-6">
        {lanes.map((lane) => (
          <div key={lane.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-sm font-medium tracking-widest text-brand-blue uppercase">
              {lane.label}
            </span>
            <div className="flex items-center gap-2">
              {lane.nodes.map((node, index) => (
                <div key={node} className="flex items-center gap-2">
                  {index > 0 ? (
                    <ArrowRight className="size-3.5 shrink-0 text-brand-blue/60" />
                  ) : null}
                  <code className="rounded-lg border bg-background px-3 py-2 font-mono text-xs whitespace-nowrap">
                    {node}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title}>
            <feature.icon
              className="mb-3 size-5 text-brand-strong"
              strokeWidth={1.5}
            />
            <h3 className="text-xl font-medium">{feature.title}</h3>
            <p className="mt-1 text-base text-muted-foreground">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
