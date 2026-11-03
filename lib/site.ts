// Single source of truth for names, URLs, and nav. Everything user-facing
// links through here so environments and future domains change in one place.

export const siteName = "Xorgate"
export const siteTagline = "AI-Native IoT Infrastructure"
export const siteDescription =
  "Xorgate is an end-to-end platform for Physical AI and Edge IoT: ready-made hardware kits, a device agent for telemetry and live video, and a cloud with zero-touch provisioning, replay, and AI workflows."

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.xorgate.io"

export const consoleUrl =
  process.env.NEXT_PUBLIC_CONSOLE_URL ?? "https://console.xorgate.io"
export const docsUrl =
  process.env.NEXT_PUBLIC_DOCS_URL ?? "https://docs.xorgate.io"
export const contactEmail = "hello@xorgate.io"
export const githubUrl = "https://github.com/epyelabs/xorgate"

export const nav = [
  { label: "Hardware", href: "/hardware" },
  { label: "FAQ", href: "/faq" },
  { label: "Documentation", href: docsUrl, external: true },
] as const
