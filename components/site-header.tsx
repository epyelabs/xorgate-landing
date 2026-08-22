"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/social-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { XorgateLogo } from "@/components/xorgate-logo"
import { consoleUrl, docsUrl, nav } from "@/lib/site"

// Floating-card navbar (stereolabs-style): a single rounded bar inset from
// the viewport edges, fixed so it floats over the hero video. Sentence-case
// links pushed right, no chevrons or dividers, one pill CTA as the sole
// accent.
export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    // Card edges line up with the section content width (max-w-content + px-6).
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-content px-6">
        <div className="rounded-xl border bg-shell/90 shadow-sm backdrop-blur">
          <div className="flex h-14 items-center px-5">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <XorgateLogo className="h-6 w-auto text-brand-logo" />
            </Link>

            <nav className="ml-auto hidden items-center gap-8 lg:flex">
              {nav.map((item) =>
                "external" in item && item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-base text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="ml-auto flex items-center gap-1.5 lg:ml-10">
              <Button
                variant="brand"
                className="h-9 rounded-full px-4 text-sm max-sm:h-8 max-sm:px-3 max-sm:text-xs"
                asChild
              >
                <a href={docsUrl}>Get started</a>
              </Button>
              {/* Placement only for now; wire the href once the org is public. */}
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="GitHub"
                className="hidden md:inline-flex"
              >
                <GithubIcon className="size-4.5" />
              </Button>
              <div className="max-[359px]:hidden">
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                size="icon-lg"
                className="lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
              >
                {open ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {open ? (
            <nav className="border-t px-5 py-4 lg:hidden">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.label}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        className="block py-2 text-base text-foreground/80 hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2 text-base text-foreground/80 hover:text-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <a
                    href={consoleUrl}
                    className="block py-2 text-base text-foreground/80 hover:text-foreground"
                  >
                    Console
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  )
}
