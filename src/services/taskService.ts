import api from "../api/axios"

export const getTasks = async () => {
  const res = await api.get("/tasks")
  return res.data
}

export const createTask = async (
  title: string,
  description: string,
  priority: string,
  dueDate: string
) => {
  const res = await api.post("/tasks", {
    title,
    description,
    priority,
    due_date: dueDate || null,
  })

  return res.data
}

export const deleteTask = async (id: number) => {
  const res = await api.delete(`/tasks/${id}`)
  return res.data
}

export const toggleTask = async (id: number) => {
  const res = await api.patch(`/tasks/${id}/toggle`)
  return res.data
}

export const updateTask = async (
  id: number,
  title: string,
  description: string,
  completed: boolean,
  priority: string,
  dueDate: string
) => {
  const res = await api.put(`/tasks/${id}`, {
    title,
    description,
    completed,
    priority,
    due_date: dueDate || null,
  })

  return res.data
}