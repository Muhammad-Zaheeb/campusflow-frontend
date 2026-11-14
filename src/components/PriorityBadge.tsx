import type { Priority } from "../types"

const dot: Record<Priority, string> = {
  High: "bg-redpen",
  Medium: "bg-marker",
  Low: "bg-pencil/50",
}

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-pencil">
      <span className={`h-1.5 w-1.5 rounded-full ${dot[priority] ?? dot.Medium}`} aria-hidden />
      {priority}
    </span>
  )
}
