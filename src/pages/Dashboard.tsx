import { useCallback, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { ClipboardList, Plus, SearchX } from "lucide-react"

import Navbar from "../components/Navbar"
import StatsCards from "../components/StatsCards"
import TaskCard from "../components/TaskCard"
import TaskFormModal from "../components/TaskFormModal"
import ConfirmDialog from "../components/ConfirmDialog"
import Toolbar, { type Filter, type Sort } from "../components/Toolbar"
import EmptyState from "../components/EmptyState"
import TaskSkeleton from "../components/TaskSkeleton"
import SlowServerHint from "../components/SlowServerHint"

import { createTask, deleteTask, getTasks, toggleTask, updateTask } from "../services/taskService"
import { getMe } from "../services/authService"
import { getErrorMessage } from "../utils/errors"
import { isOverdue, parseDate } from "../utils/date"
import type { Task, TaskInput } from "../types"

const priorityRank = { High: 0, Medium: 1, Low: 2 } as const

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

function sortTasks(tasks: Task[], sort: Sort): Task[] {
  const byDue = (a: Task, b: Task) => {
    const da = parseDate(a.due_date)?.getTime() ?? Infinity
    const db = parseDate(b.due_date)?.getTime() ?? Infinity
    return da - db
  }
  const copy = [...tasks]
  if (sort === "newest") return copy.sort((a, b) => b.id - a.id)
  if (sort === "priority")
    return copy.sort((a, b) => (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1) || byDue(a, b))
  return copy.sort((a, b) => byDue(a, b) || (priorityRank[a.priority] ?? 1) - (priorityRank[b.priority] ?? 1))
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [userName, setUserName] = useState<string>()
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<Sort>("due")

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [saving, setSaving] = useState(false)

  const [toDelete, setToDelete] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState(false)

  // ---------------- LOAD ----------------
  const load = useCallback(async () => {
    try {
      const [taskList, me] = await Promise.all([getTasks(), getMe().catch(() => null)])
      setTasks(taskList)
      if (me) setUserName(me.name)
    } catch (err) {
      setLoadError(getErrorMessage(err, "Couldn't load your tasks"))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetch on mount; state is only set after the request resolves
    load()
  }, [load])

  const retry = () => {
    setLoading(true)
    setLoadError("")
    load()
  }

  // ---------------- ACTIONS ----------------
  const openNew = () => {
    setEditing(null)
    setFormOpen(true)
  }

  // Press "n" anywhere (outside a text field) to add a task
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
      if (e.key.toLowerCase() === "n" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey && !formOpen && !toDelete) {
        e.preventDefault()
        setEditing(null)
        setFormOpen(true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [formOpen, toDelete])

  const openEdit = (task: Task) => {
    setEditing(task)
    setFormOpen(true)
  }

  const closeForm = useCallback(() => {
    if (!saving) setFormOpen(false)
  }, [saving])

  const handleSave = async (input: TaskInput) => {
    setSaving(true)
    try {
      if (editing) {
        const updated = await updateTask(editing.id, input)
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
        toast.success("Task updated")
      } else {
        const created = await createTask(input)
        setTasks((prev) => [created, ...prev])
        toast.success("Task added")
      }
      setFormOpen(false)
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't save the task"))
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (task: Task) => {
    // Update the screen immediately, then roll back if the server fails
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t)))
    try {
      const updated = await toggleTask(task.id)
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
      if (updated.completed) toast.success("Nice work! Task completed 🎉")
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
      toast.error(getErrorMessage(err, "Couldn't update the task"))
    }
  }

  const confirmDelete = async () => {
    if (!toDelete) return
    setDeleting(true)
    try {
      await deleteTask(toDelete.id)
      setTasks((prev) => prev.filter((t) => t.id !== toDelete.id))
      toast.success("Task deleted")
      setToDelete(null)
    } catch (err) {
      toast.error(getErrorMessage(err, "Couldn't delete the task"))
    } finally {
      setDeleting(false)
    }
  }

  // ---------------- DERIVED DATA ----------------
  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length
    const overdue = tasks.filter(isOverdue).length
    return { total: tasks.length, completed, pending: tasks.length - completed, overdue }
  }, [tasks])

  const searched = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter((t) => t.title.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q))
  }, [tasks, search])

  const counts: Record<Filter, number> = {
    all: searched.length,
    pending: searched.filter((t) => !t.completed).length,
    overdue: searched.filter(isOverdue).length,
    completed: searched.filter((t) => t.completed).length,
  }

  const visible = useMemo(() => {
    const filtered = searched.filter((t) => {
      if (filter === "pending") return !t.completed
      if (filter === "completed") return t.completed
      if (filter === "overdue") return isOverdue(t)
      return true
    })
    return sortTasks(filtered, sort)
  }, [searched, filter, sort])

  const todo = visible.filter((t) => !t.completed)
  const done = visible.filter((t) => t.completed)

  const firstName = userName?.split(" ")[0]
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })

  const cardProps = { onToggle: handleToggle, onEdit: openEdit, onDelete: setToDelete }

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen">
      <Navbar userName={userName} />

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{today}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {greeting()}
              {firstName ? `, ${firstName}` : ""} 👋
            </h1>
            {!loading && !loadError && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stats.overdue > 0
                  ? `You have ${stats.overdue} overdue ${stats.overdue === 1 ? "task" : "tasks"}. Let's catch up.`
                  : stats.pending > 0
                    ? `${stats.pending} ${stats.pending === 1 ? "task" : "tasks"} to go. You're on track.`
                    : "You're all caught up."}
              </p>
            )}
          </div>
          <button type="button" className="btn-primary self-start sm:self-auto" onClick={openNew} title="New task (N)">
            <Plus size={18} /> New task
          </button>
        </div>

        <StatsCards {...stats} />

        <Toolbar
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
          sort={sort}
          onSort={setSort}
          counts={counts}
        />

        {loading ? (
          <div>
            <TaskSkeleton />
            {loading && <SlowServerHint />}
          </div>
        ) : loadError ? (
          <EmptyState
            icon={<ClipboardList size={22} />}
            title="Couldn't load your tasks"
            text={loadError}
            action={
              <button type="button" className="btn-primary" onClick={retry}>
                Try again
              </button>
            }
          />
        ) : tasks.length === 0 ? (
          <EmptyState
            icon={<ClipboardList size={22} />}
            title="No tasks yet"
            text="Add your first assignment, quiz or project and CampusFlow will keep track of the deadline."
            action={
              <button type="button" className="btn-primary" onClick={openNew}>
                <Plus size={18} /> Add your first task
              </button>
            }
          />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<SearchX size={22} />}
            title="Nothing matches"
            text={search ? `No tasks match "${search}".` : "No tasks in this view."}
            action={
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSearch("")
                  setFilter("all")
                }}
              >
                Show all tasks
              </button>
            }
          />
        ) : filter === "all" ? (
          <div className="space-y-8">
            {todo.length > 0 && (
              <TaskSection title="To do" count={todo.length}>
                {todo.map((t) => (
                  <TaskCard key={t.id} task={t} {...cardProps} />
                ))}
              </TaskSection>
            )}
            {done.length > 0 && (
              <TaskSection title="Completed" count={done.length}>
                {done.map((t) => (
                  <TaskCard key={t.id} task={t} {...cardProps} />
                ))}
              </TaskSection>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((t) => (
              <TaskCard key={t.id} task={t} {...cardProps} />
            ))}
          </div>
        )}
      </main>

      <TaskFormModal open={formOpen} task={editing} saving={saving} onClose={closeForm} onSave={handleSave} />

      <ConfirmDialog
        open={toDelete !== null}
        title="Delete task?"
        message={toDelete ? `"${toDelete.title}" will be permanently deleted. This can't be undone.` : ""}
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setToDelete(null)}
      />
    </div>
  )
}

function TaskSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs normal-case tracking-normal text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {count}
        </span>
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
