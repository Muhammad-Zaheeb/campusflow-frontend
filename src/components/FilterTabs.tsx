type Props = {
  filter: string
  setFilter: (value: string) => void
}

export default function FilterTabs({ filter, setFilter }: Props) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "completed", label: "Completed" },
  ]

  return (
    <div className="flex gap-3 mb-6">
      {tabs.map((tab) => {
        const active = filter === tab.key

        return (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              border
              ${
                active
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
              }
            `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}