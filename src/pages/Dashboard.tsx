import { useEffect, useState } from "react"

import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
} from "../services/taskService"

import Navbar from "../components/Navbar"
import StatsCards from "../components/StatsCards"
import TaskCard from "../components/TaskCard"
import SearchBar from "../components/SearchBar"
import FilterTabs from "../components/FilterTabs"
import TaskForm from "../components/TaskForm"

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const [editId, setEditId] = useState<number | null>(null)

  const loadTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreateOrUpdate = async () => {
    if (!title.trim()) return

    try {
      if (editId !== null) {
        const existingTask = tasks.find((t) => t.id === editId)

        await updateTask(
          editId,
          title,
          description,
          existingTask?.completed ?? false,
          priority
        )
      } else {
        await createTask(title, description, priority)
      }

      setTitle("")
      setDescription("")
      setPriority("Medium")
      setEditId(null)

      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = (task: any) => {
    setEditId(task.id)
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority || "Medium")

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id)
      loadTasks()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed

  let filteredTasks = tasks.filter((task) => {
    const q = search.toLowerCase()

    return (
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q)
    )
  })

  if (filter === "pending") {
    filteredTasks = filteredTasks.filter((t) => !t.completed)
  }

  if (filter === "completed") {
    filteredTasks = filteredTasks.filter((t) => t.completed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">

      <Navbar onLogout={handleLogout} />

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto p-6 text-gray-900 dark:text-gray-100">

        <StatsCards total={total} completed={completed} pending={pending} />

        <h1 className="text-3xl font-bold mb-6">
          My Tasks
        </h1>

        <SearchBar search={search} setSearch={setSearch} />

        <FilterTabs filter={filter} setFilter={setFilter} />

        <TaskForm
          title={title}
          description={description}
          priority={priority}
          isEditing={editId !== null}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onPriorityChange={setPriority}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setEditId(null)
            setTitle("")
            setDescription("")
            setPriority("Medium")
          }}
        />

        {/* TASK LIST */}
        <div className="space-y-4">

          {filteredTasks.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-10 text-center text-gray-500 dark:text-gray-300">
              No tasks found.
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors"
              >
                <TaskCard
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            ))
          )}

        </div>

      </div>
    </div>
  )
}