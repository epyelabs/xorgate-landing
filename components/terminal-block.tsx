import { cn } from "@/lib/utils"

// A shell-styled code surface for the provisioning moment. Deliberately dark
// in both themes (code reads as code). Line types: "$" commands, "#" comments,
// plain output.
export function TerminalBlock({
  lines,
  className,
}: {
  lines: string[]
  className?: string
}) {
  return (
    <pre
      className={cn(
        "overflow-x-auto rounded-xl border border-white/10 bg-neutral-950 p-5 font-mono text-sm leading-7 text-neutral-100",
        className
      )}
    >
      {lines.map((line, index) => {
        if (line.startsWith("#")) {
          return (
            <div key={index} className="text-neutral-500">
              {line}
            </div>
          )
        }
        if (line.startsWith("$ ")) {
          return (
            <div key={index}>
              <span className="text-brand select-none">$ </span>
              {line.slice(2)}
            </div>
          )
        }
        return (
          <div key={index} className="text-neutral-400">
            {line}
          </div>
        )
      })}
    </pre>
  )
}
