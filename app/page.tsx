import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TerminalBlock } from "@/components/terminal-block"
import { consoleUrl, docsUrl } from "@/lib/site"

export default function HomePage() {
  return (
    <>
      <section className="pt-24 pb-24 md:pt-36 md:pb-32">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 text-center">
          <h1 className="max-w-3xl text-5xl font-medium tracking-tight text-balance md:text-6xl">
            The platform for Physical AI and Edge IoT
          </h1>
          <p className="max-w-2xl text-lg text-balance text-muted-foreground">
            Xorgate connects sensing hardware in the field to intelligent cloud
            workflows. Build, deploy, and scale sensor-driven systems without
            rebuilding hardware, connectivity, streaming, and AI infrastructure
            every time.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
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
          <div className="mt-8 w-full max-w-2xl text-left">
            <TerminalBlock
              lines={[
                "# Mint a claim code in the console, then on the device:",
                "$ curl -s https://api.xorgate.io/get/K7QF4M2P -o install.sh",
                "$ sudo bash install.sh",
                "# Device online. Telemetry and live video in your fleet.",
              ]}
            />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Zero-touch provisioning: one code, one command. Nothing is typed
              into the device by hand.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
