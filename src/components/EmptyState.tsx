import type { ReactNode } from "react"

export default function EmptyState({ title, text, action }: { icon?: ReactNode; title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded border border-dashed border-rule px-6 py-14 text-center">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-pencil">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
