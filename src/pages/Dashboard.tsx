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

  // ---------------- CRUD ----------------
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

    resetForm()
    loadTasks()
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setDueDate("")
    setEditId(null)
  }

  const handleEdit = (task: any) => {
    setEditId(task.id)
    setTitle(task.title)
    setDescription(task.description)
    setPriority(task.priority || "Medium")
    setDueDate(task.due_date || "")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    loadTasks()
  }

  const handleToggle = async (id: number) => {
    await toggleTask(id)
    loadTasks()
  }

  // ---------------- DATE LOGIC ----------------
  const today = new Date()

  const isOverdue = (task: any) =>
    !task.completed &&
    task.due_date &&
    new Date(task.due_date) < today

  const isUpcoming = (task: any) =>
    !task.completed &&
    task.due_date &&
    new Date(task.due_date) >= today

  // ---------------- FILTER ----------------
  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  )

  const overdue = filtered.filter(isOverdue)
  const upcoming = filtered.filter(isUpcoming)
  const completed = filtered.filter((t) => t.completed)

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        <StatsCards
          total={tasks.length}
          completed={completed.length}
          pending={tasks.length - completed.length}
        />

        <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-4">
          🎓 CampusFlow Dashboard
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
          onCancel={resetForm}
        />

        {/* 🔥 OVERDUE */}
        <Section title="🔥 Overdue Tasks" color="red">
          {overdue.length === 0 ? (
            <Empty text="No overdue tasks 🎉" />
          ) : (
            overdue.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </Section>

        {/* 📅 UPCOMING */}
        <Section title="📅 Upcoming Tasks" color="yellow">
          {upcoming.length === 0 ? (
            <Empty text="No upcoming tasks" />
          ) : (
            upcoming.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </Section>

        {/* ✅ COMPLETED */}
        <Section title="✅ Completed Tasks" color="green">
          {completed.length === 0 ? (
            <Empty text="No completed tasks yet" />
          ) : (
            completed.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </Section>

      </div>
    </div>
  )
}

// ---------------- UI HELPERS ----------------

function Section({ title, children }: any) {
  return (
    <div className="mt-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Empty({ text }: { text: string }) {
  return (
    <div className="p-4 border border-gray-800 rounded-lg text-gray-500 text-sm">
      {text}
    </div>
  )
}