type Props = {
  title: string
  description: string
  priority: string
  isEditing: boolean

  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onPriorityChange: (value: string) => void

  onSubmit: () => void
  onCancel: () => void
}

export default function TaskForm({
  title,
  description,
  priority,
  isEditing,

  onTitleChange,
  onDescriptionChange,
  onPriorityChange,

  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 transition">

      <input
        className="w-full border rounded-lg p-3 mb-3
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white
        border-gray-300 dark:border-gray-700"
        placeholder="Task title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <textarea
        className="w-full border rounded-lg p-3 mb-3 resize-none
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white
        border-gray-300 dark:border-gray-700"
        rows={3}
        placeholder="Task description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />

      <select
        className="w-full border rounded-lg p-3 mb-4
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white
        border-gray-300 dark:border-gray-700"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="Low">🟢 Low Priority</option>
        <option value="Medium">🟡 Medium Priority</option>
        <option value="High">🔴 High Priority</option>
      </select>

      <div className="flex gap-3">

        <button
          onClick={onSubmit}
          className={`px-5 py-2 rounded-lg text-white transition ${
            isEditing
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>

        {isEditing && (
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border
            dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        )}

      </div>

    </div>
  )
}