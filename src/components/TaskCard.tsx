import { Check, Pencil, Trash2 } from "lucide-react"
import type { Task } from "../types"
import { dueLabel, isDueToday } from "../utils/date"
import PriorityBadge from "./PriorityBadge"

type Props = {
  task: Task
  onToggle: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const toneClasses = {
  danger: "text-redpen",
  warning: "text-ink",
  info: "text-pencil",
  muted: "text-pencil",
}

/** One row in the task list. */
export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  const label = dueLabel(task)
  const today = isDueToday(task)

  return (
    <article className="group flex gap-3.5 py-4">
      <button
        type="button"
        onClick={() => onToggle(task)}
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        className={`relative mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-[1.5px] transition
          before:absolute before:-inset-[13px] before:content-['']
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pen/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
            task.completed ? "border-ink bg-ink text-paper" : "border-pencil/50 text-transparent hover:border-ink"
          }`}
      >
        <Check size={11} strokeWidth={3.5} />
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`break-words text-[15.5px] font-medium leading-snug ${
            task.completed ? "text-pencil line-through decoration-pencil/50" : ""
          }`}
        >
          <span className={today ? "highlight" : ""}>{task.title}</span>
        </h3>

        {task.description && (
          <p className="mt-0.5 whitespace-pre-line break-words text-sm leading-relaxed text-pencil">{task.description}</p>
        )}

        {(label || !task.completed) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            {label && <span className={`text-[13px] ${toneClasses[label.tone]}`}>{label.text}</span>}
            {!task.completed && <PriorityBadge priority={task.priority} />}
          </div>
        )}
      </div>

      {/* Visible on hover with a mouse; always visible on touch screens */}
      <div className="-mr-1.5 -mt-1.5 flex shrink-0 items-start transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100">
        <button type="button" onClick={() => onEdit(task)} className="icon-btn" aria-label={`Edit "${task.title}"`} title="Edit">
          <Pencil size={15} />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          className="icon-btn hover:!text-redpen"
          aria-label={`Delete "${task.title}"`}
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  )
}
