"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  // Avoid a hydration mismatch: the server doesn't know the stored theme, so
  // render a neutral icon until mounted.
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const resolveNext = () => {
    if (theme === "dark") return "light"
    if (theme === "light") return "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "light"
      : "dark"
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolveNext())}
    >
      {mounted ? (
        <>
          <Sun className="dark:hidden" />
          <Moon className="hidden dark:block" />
        </>
      ) : (
        <Sun />
      )}
    </Button>
  )
}
