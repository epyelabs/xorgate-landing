import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { consoleUrl, docsUrl } from "@/lib/site"

// Closing CTA: plain and centred on the page ground, the hero's two actions
// again. A quiet hatch in the bottom-left corner, the same static accent
// language as the sections above, is the only ornament.
export function CtaBand() {
  return (
    <Section accent="hatch-bl">
      <div className="flex flex-col items-center gap-5 text-center">
        <h2 className="text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Start building today
        </h2>
        <p className="max-w-xl text-lg text-balance text-muted-foreground">
          Bring a Raspberry Pi 4/5 and a camera, run one install command, and it
          joins your fleet with live telemetry, video, and workflows.
        </p>
        <div className="mt-3 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
          <Button variant="brand" size="xl" asChild>
            <a href={`${consoleUrl}/signup`}>
              Get started
              <ArrowRight data-icon="inline-end" />
            </a>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <a href={docsUrl}>Read the docs</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
