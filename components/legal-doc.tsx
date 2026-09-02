import type { ReactNode } from "react"
import Link from "next/link"
import { PageHero } from "@/components/page-hero"
import { Section } from "@/components/section"
import { LEGAL } from "@/lib/legal"

export interface LegalSection {
  id: string
  title: string
  body: ReactNode
}

const DOCS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
] as const

// Long-form legal document: the site hero for the title, then a single
// measure of prose. Used by /privacy and /terms, which are the documents the
// console's login and signup pages link out to.
export function LegalDoc({
  title,
  summary,
  current,
  sections,
}: {
  title: string
  summary: string
  current: (typeof DOCS)[number]["href"]
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={summary} accent="grid-tr">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <p className="text-muted-foreground">
            Effective {LEGAL.effectiveDate}
          </p>
          <nav aria-label="Legal documents" className="flex gap-4">
            {DOCS.filter((doc) => doc.href !== current).map((doc) => (
              <Link
                key={doc.href}
                href={doc.href}
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {doc.label}
              </Link>
            ))}
          </nav>
        </div>
      </PageHero>

      <Section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <article className="max-w-3xl">
          <nav
            aria-label="Contents"
            className="rounded-lg border bg-card p-5 text-sm"
          >
            <p className="font-medium">Contents</p>
            <ol className="mt-3 grid list-decimal gap-1.5 pl-5 md:grid-cols-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 space-y-10">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
                aria-labelledby={`${section.id}-heading`}
              >
                <h2
                  id={`${section.id}-heading`}
                  className="text-xl font-semibold tracking-tight"
                >
                  {index + 1}. {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-[15px] leading-7 text-foreground/90 [&_a]:underline [&_a]:underline-offset-4 [&_h3]:mt-5 [&_h3]:font-medium [&_h3]:text-foreground [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-6 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
                  {section.body}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-16 border-t pt-6 text-sm text-muted-foreground">
            Questions about this document? Email{" "}
            <a
              href={`mailto:${LEGAL.contactEmail}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {LEGAL.contactEmail}
            </a>
            .
          </p>
        </article>
      </Section>
    </>
  )
}
