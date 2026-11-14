import { Search, X } from "lucide-react"

export type Filter = "all" | "pending" | "overdue" | "completed"
export type Sort = "due" | "priority" | "newest"

type Props = {
  search: string
  onSearch: (value: string) => void
  filter: Filter
  onFilter: (value: Filter) => void
  sort: Sort
  onSort: (value: Sort) => void
  counts: Record<Filter, number>
}

const tabs: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "overdue", label: "Overdue" },
  { key: "completed", label: "Completed" },
]

export default function Toolbar({ search, onSearch, filter, onFilter, sort, onSort, counts }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            className="input pl-10 pr-9"
            placeholder="Search tasks…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search tasks"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <select className="input sm:w-48" value={sort} onChange={(e) => onSort(e.target.value as Sort)} aria-label="Sort tasks">
          <option value="due">Sort: Due date</option>
          <option value="priority">Sort: Priority</option>
          <option value="newest">Sort: Newest first</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter tasks">
        {tabs.map((tab) => {
          const active = filter === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onFilter(tab.key)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 text-xs ${
                  active ? "bg-white/20 dark:bg-slate-900/15" : "bg-slate-200 dark:bg-slate-800"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
