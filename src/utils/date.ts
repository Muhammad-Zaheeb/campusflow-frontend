import type { Task } from "../types"

// Parse "YYYY-MM-DD" as a LOCAL date. `new Date("2026-11-20")` would parse it
// as UTC midnight, which shows the wrong day in some time zones.
export function parseDate(value: string | null): Date | null {
  if (!value) return null
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export function startOfToday(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

/** Whole days from today to the due date: negative = overdue, 0 = today. */
export function daysUntil(value: string | null): number | null {
  const due = parseDate(value)
  if (!due) return null
  return Math.round((due.getTime() - startOfToday().getTime()) / 86_400_000)
}

export function isOverdue(task: Task): boolean {
  const days = daysUntil(task.due_date)
  return !task.completed && days !== null && days < 0
}

export function isDueToday(task: Task): boolean {
  return !task.completed && daysUntil(task.due_date) === 0
}

export function formatDate(value: string | null): string {
  const d = parseDate(value)
  if (!d) return ""
  const sameYear = d.getFullYear() === new Date().getFullYear()
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  })
}

export type DueLabel = { text: string; tone: "danger" | "warning" | "info" | "muted" }

export function dueLabel(task: Task): DueLabel | null {
  const days = daysUntil(task.due_date)
  if (days === null) return null
  if (task.completed) return { text: formatDate(task.due_date), tone: "muted" }
  if (days < 0) return { text: `Overdue by ${-days} ${-days === 1 ? "day" : "days"}`, tone: "danger" }
  if (days === 0) return { text: "Due today", tone: "warning" }
  if (days === 1) return { text: "Due tomorrow", tone: "warning" }
  if (days <= 7) return { text: `Due in ${days} days`, tone: "info" }
  return { text: `Due ${formatDate(task.due_date)}`, tone: "muted" }
}

/** Today's date as "YYYY-MM-DD" in local time, for <input type="date" min>. */
export function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
