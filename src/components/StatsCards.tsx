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

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-gray-500">Total Tasks</h2>
        <p className="text-3xl font-bold">{total}</p>
      </div>

      <div className="bg-green-100 rounded-lg shadow p-6">
        <h2 className="text-green-700">Completed</h2>
        <p className="text-3xl font-bold">{completed}</p>
      </div>

      <div className="bg-yellow-100 rounded-lg shadow p-6">
        <h2 className="text-yellow-700">Pending</h2>
        <p className="text-3xl font-bold">{pending}</p>
      </div>

    </div>
  )
}