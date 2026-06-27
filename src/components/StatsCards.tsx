type Props = {
  total: number
  completed: number
  pending: number
}

export default function StatsCards({
  total,
  completed,
  pending,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">

      {/* TOTAL */}
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow p-6">
        <h2 className="text-gray-500 dark:text-gray-400">Total Tasks</h2>
        <p className="text-3xl font-bold">{total}</p>
      </div>

      {/* COMPLETED */}
      <div className="bg-green-100 dark:bg-green-900/30 rounded-lg shadow p-6">
        <h2 className="text-green-700 dark:text-green-300">Completed</h2>
        <p className="text-3xl font-bold text-green-800 dark:text-green-200">
          {completed}
        </p>
      </div>

      {/* PENDING */}
      <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg shadow p-6">
        <h2 className="text-yellow-700 dark:text-yellow-300">Pending</h2>
        <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">
          {pending}
        </p>
      </div>

    </div>
  )
}