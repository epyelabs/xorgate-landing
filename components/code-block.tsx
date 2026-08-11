import { codeToHtml } from "shiki"
import { CopyButton } from "@/components/copy-button"
import { cn } from "@/lib/utils"

// Server component: shiki runs at build time (static export), nothing ships to
// the client except the highlighted HTML. Code surfaces are deliberately dark
// in both themes (design.md).
export async function CodeBlock({
  code,
  lang,
  filename,
  className,
}: {
  code: string
  lang: "bash" | "json" | "tsx" | "ts"
  filename?: string
  className?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark-default",
  })

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-neutral-950",
        className
      )}
    >
      <div className="flex h-10 items-center justify-between border-b border-white/10 px-4">
        <span className="font-mono text-xs text-neutral-400">{filename}</span>
        <CopyButton text={code} />
      </div>
      <div
        className="overflow-x-auto p-4 font-mono text-sm leading-6 [&_pre]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
