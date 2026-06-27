type Props = {
  search: string
  setSearch: (value: string) => void
}

export default function SearchBar({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          w-full p-4 rounded-xl shadow-sm border
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />
    </div>
  )
}