import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react"
import type { Task } from "../types"
import { dueLabel, isOverdue } from "../utils/date"
import PriorityBadge from "./PriorityBadge"

type Props = {
  task: Task
  onToggle: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const toneClasses = {
  danger: "text-red-600 dark:text-red-400",
  warning: "text-amber-600 dark:text-amber-400",
  info: "text-indigo-600 dark:text-indigo-400",
  muted: "text-slate-500 dark:text-slate-400",
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  const label = dueLabel(task)
  const overdue = isOverdue(task)

  return (
    <article
      className={`card group flex gap-3 p-4 transition hover:shadow-md animate-fade-in ${
        overdue ? "border-l-4 border-l-red-500 dark:border-l-red-500" : ""
      } ${task.completed ? "opacity-70" : ""}`}
    >
      <button
        type="button"
        onClick={() => onToggle(task)}
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/25 ${
            task.completed
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300 text-transparent hover:border-emerald-500 hover:text-emerald-500 dark:border-slate-600"
          }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`break-words font-semibold ${
              task.completed ? "text-slate-500 line-through dark:text-slate-400" : ""
            }`}
          >
            {task.title}
          </h3>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="mt-1 whitespace-pre-line break-words text-sm text-slate-600 dark:text-slate-400">
            {task.description}
          </p>
        )}

        {label && (
          <p className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${toneClasses[label.tone]}`}>
            <CalendarDays size={14} />
            {label.text}
          </p>
        )}
      </div>

      <div className="-mr-1 -mt-1 flex shrink-0 items-start gap-0.5">
        <button type="button" onClick={() => onEdit(task)} className="icon-btn" aria-label={`Edit "${task.title}"`} title="Edit">
          <Pencil size={16} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="icon-btn hover:!bg-red-50 hover:!text-red-600 dark:hover:!bg-red-950/50 dark:hover:!text-red-400"
          aria-label={`Delete "${task.title}"`}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  )
}
