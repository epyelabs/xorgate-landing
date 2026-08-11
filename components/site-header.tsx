"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { XorgateLogo } from "@/components/xorgate-logo"
import { consoleUrl, nav } from "@/lib/site"

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-6">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <XorgateLogo className="size-5 text-brand" />
          <span className="text-base font-medium tracking-tight">xorgate</span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((item) =>
            "external" in item && item.external ? (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="lg"
            className="hidden md:inline-flex"
            asChild
          >
            <a href={consoleUrl}>Console</a>
          </Button>
          <Button variant="brand" size="lg" asChild>
            <a href={`${consoleUrl}/signup`}>Get started</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav className="border-t px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.label}>
                {"external" in item && item.external ? (
                  <a
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-foreground"
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
                className="block py-2 text-sm text-muted-foreground hover:text-foreground"
              >
                Console
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
