import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { Section, SectionHeading } from "@/components/section"
import {
  provisionSnippet,
  reactSnippet,
  telemetrySnippet,
} from "@/lib/snippets"

export function CodeMoment() {
  return (
    <Section className="border-t">
      <SectionHeading
        eyebrow="Developers"
        title="From unboxing to API call in minutes"
        intro="The REST API speaks JSON over HTTPS, documented with an interactive OpenAPI playground. JavaScript and React SDKs are in development and follow the same shapes."
      />
      <Tabs defaultValue="provision" className="mx-auto max-w-3xl">
        <TabsList>
          <TabsTrigger value="provision">Provision</TabsTrigger>
          <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
          <TabsTrigger value="react">React</TabsTrigger>
        </TabsList>
        <TabsContent value="provision" className="mt-4">
          <CodeBlock
            code={provisionSnippet}
            lang="bash"
            filename="provision.sh"
          />
          <p className="mt-3 text-sm text-muted-foreground">
            The claim code creates the device, mints its certificate, and
            installs everything: agent, cellular manager, camera pipelines.
          </p>
        </TabsContent>
        <TabsContent value="telemetry" className="mt-4">
          <CodeBlock
            code={telemetrySnippet}
            lang="bash"
            filename="telemetry.sh"
          />
          <p className="mt-3 text-sm text-muted-foreground">
            Every metric is a simple group.field name, and the same vocabulary
            flows through live streams, history, and recordings.
          </p>
        </TabsContent>
        <TabsContent value="react" className="mt-4">
          <CodeBlock code={reactSnippet} lang="tsx" filename="live-speed.tsx" />
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">In development</Badge>
            Headless hooks for live telemetry, video, and replay, with no
            styling opinion.
          </p>
        </TabsContent>
      </Tabs>
    </Section>
  )
}
