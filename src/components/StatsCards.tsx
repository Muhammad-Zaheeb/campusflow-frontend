import { AlertTriangle, CheckCircle2, Circle, ListTodo } from "lucide-react"
import type { ReactNode } from "react"

type Props = {
  total: number
  completed: number
  pending: number
  overdue: number
}

export default function StatsCards({ total, completed, pending, overdue }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Total" value={total} icon={<ListTodo size={18} />} tone="indigo" />
        <Stat label="Pending" value={pending} icon={<Circle size={18} />} tone="amber" />
        <Stat label="Completed" value={completed} icon={<CheckCircle2 size={18} />} tone="emerald" />
        <Stat label="Overdue" value={overdue} icon={<AlertTriangle size={18} />} tone="red" />
      </div>

      <div className="card p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">Overall progress</span>
          <span className="text-slate-500 dark:text-slate-400">
            {completed} of {total} done · <span className="font-semibold text-slate-900 dark:text-slate-100">{percent}%</span>
          </span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  )
}

const tones = {
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300",
  red: "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300",
}

function Stat({ label, value, icon, tone }: { label: string; value: number; icon: ReactNode; tone: keyof typeof tones }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>{icon}</span>
      <div>
        <p className="text-2xl font-bold leading-none">{value}</p>
        <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
    </div>
  )
}
