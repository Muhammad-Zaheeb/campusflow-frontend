import { useState, type FormEvent } from "react"
import type { Priority, Task, TaskInput } from "../types"
import Modal from "./Modal"

type Props = {
  open: boolean
  task: Task | null // null = creating a new task
  saving: boolean
  onClose: () => void
  onSave: (input: TaskInput) => void
}

const priorities: { value: Priority; label: string; active: string }[] = [
  { value: "Low", label: "Low", active: "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300" },
  { value: "Medium", label: "Medium", active: "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300" },
  { value: "High", label: "High", active: "border-red-500 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300" },
]

export default function TaskFormModal({ open, task, saving, onClose, onSave }: Props) {
  return (
    <Modal open={open} title={task ? "Edit task" : "New task"} onClose={onClose}>
      {/* key: a fresh form (with fresh state) every time a different task is opened */}
      <TaskForm key={task?.id ?? "new"} task={task} saving={saving} onClose={onClose} onSave={onSave} />
    </Modal>
  )
}

function TaskForm({ task, saving, onClose, onSave }: Omit<Props, "open">) {
  const [title, setTitle] = useState(task?.title ?? "")
  const [description, setDescription] = useState(task?.description ?? "")
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "Medium")
  const [dueDate, setDueDate] = useState(task?.due_date ?? "")
  const [error, setError] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Please give the task a title")
      return
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      due_date: dueDate || null,
    })
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="task-title" className="label">
            Title
          </label>
          <input
            id="task-title"
            className="input"
            placeholder="e.g. Finish DSA assignment 3"
            value={title}
            maxLength={200}
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value)
              setError("")
            }}
          />
          {error && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>

        <div>
          <label htmlFor="task-description" className="label">
            Description <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="task-description"
            className="input resize-none"
            rows={3}
            maxLength={2000}
            placeholder="Add details, links or notes"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <fieldset>
            <legend className="label">Priority</legend>
            <div className="grid grid-cols-3 gap-1.5">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  aria-pressed={priority === p.value}
                  className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                    priority === p.value
                      ? p.active
                      : "border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="task-due" className="label">
              Due date <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <div className="flex gap-1.5">
              <input id="task-due" type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              {dueDate && (
                <button type="button" className="btn-secondary px-3" onClick={() => setDueDate("")} title="Remove due date">
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving…" : task ? "Save changes" : "Add task"}
          </button>
        </div>
      </form>
  )
}
