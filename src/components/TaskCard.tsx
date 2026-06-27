export default function TaskCard({ task, onToggle, onDelete, onEdit }: any) {
  const isOverdue =
    !task.completed &&
    task.due_date &&
    new Date(task.due_date) < new Date()

  return (
    <div className={`p-4 rounded-xl border bg-gray-900 border-gray-700 ${isOverdue ? "border-red-500" : ""}`}>

      <div className="flex justify-between">
        <h2 className="font-bold">{task.title}</h2>

        {isOverdue && (
          <span className="text-red-400 text-xs">OVERDUE</span>
        )}
      </div>

      <p className="text-gray-400 mt-2">{task.description}</p>

      {task.due_date && (
        <p className="text-sm text-gray-300 mt-2">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}

      <div className="flex gap-2 mt-4">
        <button onClick={() => onToggle(task.id)} className="bg-green-600 px-3 py-1 rounded">
          Toggle
        </button>

        <button onClick={() => onEdit(task)} className="bg-yellow-600 px-3 py-1 rounded">
          Edit
        </button>

        <button onClick={() => onDelete(task.id)} className="bg-red-600 px-3 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  )
}