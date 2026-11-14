type Props = {
  total: number
  completed: number
  pending: number
  overdue: number
}

export default function StatsCards({ total, completed, pending, overdue }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  const stats = [
    { label: "Pending", value: pending, tone: "" },
    { label: "Overdue", value: overdue, tone: overdue > 0 ? "text-redpen" : "" },
    { label: "Completed", value: completed, tone: "" },
    { label: "Total", value: total, tone: "" },
  ]

  return (
    <section aria-label="Task summary" className="space-y-5">
      <dl className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-[13px] text-pencil">{s.label}</dt>
            <dd className={`mt-0.5 text-[34px] font-medium leading-none tracking-tight tabular-nums ${s.tone}`}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center gap-4">
        <div
          className="h-[3px] flex-1 overflow-hidden rounded-full bg-rule"
          role="progressbar"
          aria-label="Tasks completed"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-[13px] tabular-nums text-pencil">
          {completed} of {total} done
        </span>
      </div>
    </section>
  )
}
