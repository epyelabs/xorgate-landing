"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GithubIcon } from "@/components/social-icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { XorgateLogo } from "@/components/xorgate-logo"
import { consoleUrl, githubUrl, nav } from "@/lib/site"

// Floating-card navbar (stereolabs-style): a single rounded bar inset from
// the viewport edges, fixed so it floats over the hero video. Sentence-case
// links pushed right, no chevrons or dividers, one pill CTA as the sole
// accent.
export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  // Near-transparent while the bar floats over the hero so the wash shader
  // shows through it; solid again once real content scrolls underneath.
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    // Card edges line up with the section content width (max-w-content + px-6).
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-content px-6">
        <div
          className={cn(
            "rounded-xl border shadow-sm transition-colors duration-300",
            scrolled || open
              ? "bg-shell/90 backdrop-blur"
              : "bg-shell/30 backdrop-blur-[2px]"
          )}
        >
          <div className="flex h-14 items-center px-5">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <XorgateLogo className="h-6 w-auto text-brand" />
            </Link>

            <nav className="ml-auto hidden items-center gap-10 lg:flex">
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

            <div className="ml-auto flex items-center gap-1.5 lg:ml-12">
              <Button
                variant="outline"
                className="h-9 px-4 text-sm shadow-sm max-sm:h-8 max-sm:px-3 max-sm:text-xs"
                asChild
              >
                <a target="_blank" href={consoleUrl}>
                  Open Console
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="GitHub"
                className="hidden md:inline-flex"
                asChild
              >
                <a target="_blank" rel="noreferrer" href={githubUrl}>
                  <GithubIcon className="size-4.5" />
                </a>
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
                <li>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-2 text-base text-foreground/80 hover:text-foreground"
                  >
                    GitHub
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
