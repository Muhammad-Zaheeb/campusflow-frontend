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

const priorities: { value: Priority; active: string }[] = [
  { value: "Low", active: "border-ink bg-ink text-paper" },
  { value: "Medium", active: "border-ink bg-ink text-paper" },
  { value: "High", active: "border-redpen bg-redpen text-sheet" },
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
            placeholder="e.g. DSA assignment 3"
            value={title}
            maxLength={200}
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value)
              setError("")
            }}
          />
          {error && <p className="mt-1.5 text-sm text-redpen">{error}</p>}
        </div>

        <div>
          <label htmlFor="task-description" className="label">
            Description <span className="font-normal text-pencil">(optional)</span>
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
                  className={`rounded-full border px-2 py-2 text-sm font-medium transition ${
                    priority === p.value ? p.active : "border-rule text-pencil hover:border-pencil/50 hover:text-ink"
                  }`}
                >
                  {p.value}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="task-due" className="label">
              Due date <span className="font-normal text-pencil">(optional)</span>
            </label>
            <input id="task-due" type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            {dueDate && (
              <button
                type="button"
                className="mt-1.5 text-sm text-pencil underline decoration-pencil/30 underline-offset-4 hover:text-ink"
                onClick={() => setDueDate("")}
              >
                Remove date
              </button>
            )}
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
