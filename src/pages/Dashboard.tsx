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
import TaskForm from "../components/TaskForm"

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")

  const [search, setSearch] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  // ---------------- LOAD ----------------
  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  // ---------------- CREATE / UPDATE ----------------
  const handleSubmit = async () => {
    if (!title.trim()) return

    if (editId !== null) {
      const existing = tasks.find((t) => t.id === editId)

      await updateTask(
        editId,
        title,
        description,
        existing?.completed ?? false,
        priority,
        dueDate
      )
    } else {
      await createTask(title, description, priority, dueDate)
    }

    setTitle("")
    setDescription("")
    setPriority("Medium")
    setDueDate("")
    setEditId(null)

    loadTasks()
  }

  // ---------------- ACTIONS ----------------
  const handleDelete = async (id: number) => {
    await deleteTask(id)
    loadTasks()
  }

  const handleToggle = async (id: number) => {
    await toggleTask(id)
    loadTasks()
  }

  const handleEdit = (task: any) => {
    setEditId(task.id)
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority || "Medium")
    setDueDate(task.due_date || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // ---------------- FILTERS ----------------
  const today = new Date()

  const isOverdue = (t: any) =>
    !t.completed && t.due_date && new Date(t.due_date) < today

  const isUpcoming = (t: any) =>
    !t.completed && t.due_date && new Date(t.due_date) >= today

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  const overdue = filtered.filter(isOverdue)
  const upcoming = filtered.filter(isUpcoming)
  const completed = filtered.filter((t) => t.completed)

  const total = tasks.length

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <StatsCards
          total={total}
          completed={completed.length}
          pending={total - completed.length}
        />

        <h1 className="text-3xl font-bold mb-6">
          CampusFlow Dashboard
        </h1>

        <SearchBar search={search} setSearch={setSearch} />

        <TaskForm
          title={title}
          description={description}
          priority={priority}
          dueDate={dueDate}
          isEditing={editId !== null}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onPriorityChange={setPriority}
          onDueDateChange={setDueDate}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditId(null)
            setTitle("")
            setDescription("")
            setPriority("Medium")
            setDueDate("")
          }}
        />

        {/* OVERDUE */}
        <Section title="🔥 Overdue Tasks" tasks={overdue} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

        {/* UPCOMING */}
        <Section title="📅 Upcoming Tasks" tasks={upcoming} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

        {/* COMPLETED */}
        <Section title="✅ Completed Tasks" tasks={completed} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />

      </div>
    </div>
  )
}

function Section({ title, tasks, onToggle, onDelete, onEdit }: any) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks</p>
        ) : (
          tasks.map((t: any) => (
            <TaskCard
              key={t.id}
              task={t}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}