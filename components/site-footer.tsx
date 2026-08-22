import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LinkedinIcon, YoutubeIcon } from "@/components/social-icons"
import { AccentField } from "@/components/section"
import { XorgateWordmark } from "@/components/xorgate-logo"
import { consoleUrl, contactEmail, docsUrl, siteTagline } from "@/lib/site"

const columns = [
  {
    title: "Product",
    links: [
      { label: "Hardware", href: "/hardware" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: docsUrl, external: true },
      { label: "Console", href: consoleUrl, external: true },
      {
        label: "API Reference",
        href: `${docsUrl}/docs/api-reference`,
        external: true,
      },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: `mailto:${contactEmail}`, external: true },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t bg-shell">
      <AccentField variant="grid-full" />
      <div className="mx-auto w-full max-w-content px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <XorgateWordmark className="h-7 w-auto text-brand" />
            <p className="text-sm text-muted-foreground">{siteTagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-sm font-medium">{column.title}</p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EPYE Labs. All rights reserved.
          </p>
          {/* Placement only for now; wire up hrefs once the profiles exist.
              GitHub lives in the top navbar. */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="LinkedIn">
              <LinkedinIcon />
            </Button>
            <Button variant="ghost" size="icon" aria-label="YouTube">
              <YoutubeIcon />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}
