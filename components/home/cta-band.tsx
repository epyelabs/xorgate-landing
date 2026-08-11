import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { consoleUrl, docsUrl } from "@/lib/site"

export function CtaBand() {
  return (
    <section className="border-t bg-brand-wash py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Start building today
        </h2>
        <p className="max-w-xl text-lg text-balance text-muted-foreground">
          Bring a Raspberry Pi 5 and a camera; the platform handles the rest.
          Dev kits are on the way.
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
      </div>
    </section>
  )
}
