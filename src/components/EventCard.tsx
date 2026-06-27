type Event = {
  id: number
  title: string
  description: string
  date?: string
}

type Props = {
  event: Event
  onDelete?: (id: number) => void
  onEdit?: (event: Event) => void
}

export default function EventCard({ event, onDelete, onEdit }: Props) {
  return (
    <div className="
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      rounded-xl shadow p-5 transition
      hover:shadow-lg
    ">

      {/* HEADER */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {event.title}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {event.description}
          </p>

          {event.date && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              📅 {event.date}
            </p>
          )}
        </div>

      </div>

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="flex gap-3 mt-5">

          {onEdit && (
            <button
              onClick={() => onEdit(event)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              ✏ Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(event.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              🗑 Delete
            </button>
          )}

        </div>
      )}

    </div>
  )
}