
import { useEffect, useState } from "react"
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "../services/taskService"

import Navbar from "../components/Navbar"
import StatsCards from "../components/StatsCards"

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreate = async () => {
    if (!title) return

    await createTask(title, description)

    setTitle("")
    setDescription("")

    loadTasks()
  }

  const handleDelete = async (id: number) => {
    await deleteTask(id)
    loadTasks()
  }

  const handleToggle = async (id: number) => {
    await toggleTask(id)
    loadTasks()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <div className="max-w-6xl mx-auto p-6">

        <StatsCards
          total={total}
          completed={completed}
          pending={pending}
        />

        <h1 className="text-3xl font-bold mb-6">
          My Tasks
        </h1>

        {/* CREATE TASK */}

        <div className="bg-white shadow rounded-lg p-6 mb-8">

          <input
            className="w-full border rounded p-3 mb-3"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="w-full border rounded p-3 mb-3"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Add Task
          </button>

        </div>

        {/* TASKS */}

        <div className="space-y-4">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-white shadow rounded-lg p-5 flex justify-between items-center"
            >

              <div>

                <h2 className="text-lg font-semibold">
                  {task.title} {task.completed && "✅"}
                </h2>

                <p className="text-gray-600">
                  {task.description}
                </p>

              </div>

              <div className="space-x-2">

                <button
                  onClick={() => handleToggle(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                >
                  Toggle
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  )
}

