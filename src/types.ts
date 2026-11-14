export type Priority = "Low" | "Medium" | "High"

export type Task = {
  id: number
  title: string
  description: string | null
  completed: boolean
  priority: Priority
  due_date: string | null // "YYYY-MM-DD"
  user_id: number
}

export type TaskInput = {
  title: string
  description: string
  priority: Priority
  due_date: string | null
}

export type User = {
  id: number
  name: string
  email: string
}
