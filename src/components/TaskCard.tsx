type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  priority?: string
}

type Props = {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (task: Task) => void
}

const getPriorityStyle = (priority?: string) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
    case "Medium":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
    case "Low":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
  }
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="rounded-xl shadow-md p-5 border transition
      bg-white dark:bg-gray-800
      border-gray-200 dark:border-gray-700
      hover:shadow-lg">

      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            {task.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {task.description}
          </p>

          {/* PRIORITY BADGE */}
          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${getPriorityStyle(
              task.priority
            )}`}
          >
            {task.priority || "Medium"} Priority
          </span>
        </div>

        {/* STATUS BADGE */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            task.completed
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onToggle(task.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          ✓ Toggle
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
        >
          ✏ Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          🗑 Delete
        </button>

      </div>
    </div>
  )
}