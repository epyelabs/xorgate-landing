import Image from "next/image"
import { FlaskConical, GitBranch, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Section, SectionHeading } from "@/components/section"
import wfScreen from "@/public/wf-screen.png"

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
    <Section accent="hatch-bl">
      <SectionHeading
        title="Your data is already here. Now make it think."
        intro="Video, GPS, motion, signal. It all lands in Xorgate. Point a no-code workflow at it and turn raw streams or recorded data into detections, alerts, and answers."
      />
      {/* Real editor screenshot (content.md shot list #5): a person-detection
          pipeline on the canvas with its simulation trace alongside. */}
      <figure className="mb-12">
        <div className="overflow-hidden rounded-xl border">
          <Image
            src={wfScreen}
            alt="The Xorgate workflow editor: a person-detection pipeline of catalog nodes on the canvas, with the node palette on the left and a simulation run trace on the right"
            sizes="(min-width: 1152px) 1104px, 100vw"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          A person-detection pipeline in the editor, simulated against a
          recorded session before it ever touches a device.
        </figcaption>
      </figure>
    </Section>
  )
}
