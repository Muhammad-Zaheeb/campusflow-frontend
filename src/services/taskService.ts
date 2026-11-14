import api from "../api/axios"
import type { Task, TaskInput } from "../types"

export const getTasks = async () => {
  const res = await api.get<Task[]>("/tasks")
  return res.data
}

export const createTask = async (input: TaskInput) => {
  const res = await api.post<Task>("/tasks", input)
  return res.data
}

export const updateTask = async (id: number, changes: Partial<TaskInput & { completed: boolean }>) => {
  const res = await api.put<Task>(`/tasks/${id}`, changes)
  return res.data
}

export const toggleTask = async (id: number) => {
  const res = await api.patch<Task>(`/tasks/${id}/toggle`)
  return res.data
}

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`)
}
