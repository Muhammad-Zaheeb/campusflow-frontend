import { useEffect, useState } from "react"
import { getTasks, createTask, deleteTask, toggleTask } from "../services/taskService"

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

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* CREATE TASK */}
      <div className="mb-6 space-y-2">
        <input
          className="w-full border p-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 border rounded flex justify-between">
            <div>
              <h3 className="font-semibold">
                {task.title} {task.completed && "✅"}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleToggle(task.id)}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}