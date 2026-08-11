import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Stand-in for real product imagery (content.md shot list). Neutral surface
// with an icon and label; never stock or generated imagery.
export function ScreenshotPlaceholder({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border bg-muted",
        className
      )}
    >
      <Icon className="size-8 text-muted-foreground" strokeWidth={1.5} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
