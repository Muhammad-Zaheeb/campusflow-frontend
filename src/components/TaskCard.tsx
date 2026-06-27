type Props = {
  task: any
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (task: any) => void
}

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const overdue =
    !task.completed &&
    task.due_date &&
    new Date(task.due_date) < new Date()

  return (
    <div className={`
      p-4 rounded-xl border
      bg-gray-900 border-gray-800
      transition hover:scale-[1.01]
      ${overdue ? "border-red-500" : ""}
    `}>

      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-sm sm:text-base">
          {task.title}
        </h2>

        {overdue && (
          <span className="text-red-400 text-xs">OVERDUE</span>
        )}
      </div>

      <p className="text-gray-400 text-sm mt-2">
        {task.description}
      </p>

      {task.due_date && (
        <p className="text-xs text-gray-500 mt-2">
          📅 {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-4">

        <button
          onClick={() => onToggle(task.id)}
          className="bg-green-600 px-3 py-1 text-xs rounded"
        >
          Toggle
        </button>

        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-600 px-3 py-1 text-xs rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-600 px-3 py-1 text-xs rounded"
        >
          Delete
        </button>

      </div>
    </div>
  )
}