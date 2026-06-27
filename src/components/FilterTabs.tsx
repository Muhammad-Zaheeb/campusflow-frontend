type Props = {
  filter: string
  setFilter: (value: string) => void
}

export default function FilterTabs({ filter, setFilter }: Props) {
  const tabs = ["all", "pending", "completed"]

  return (
    <div className="flex gap-3 mb-6 flex-wrap">

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`
            px-4 py-2 rounded-full border transition text-sm font-medium

            ${
              filter === tab
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            }
          `}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}

    </div>
  )
}