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
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-pencil" />
          <input
            type="search"
            className="input pl-9 pr-9"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            aria-label="Search tasks"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearch("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1.5 text-pencil hover:text-ink"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <select className="input sm:w-40" value={sort} onChange={(e) => onSort(e.target.value as Sort)} aria-label="Sort tasks">
          <option value="due">By due date</option>
          <option value="priority">By priority</option>
          <option value="newest">Newest first</option>
        </select>
      </div>

      {/* Underlined tabs, like section tabs in a notebook */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 border-b border-rule" role="tablist" aria-label="Filter tasks">
        {tabs.map((tab) => {
          const active = filter === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onFilter(tab.key)}
              className={`-mb-px border-b-2 pb-2.5 pt-1 text-sm font-medium transition focus-visible:outline-none focus-visible:text-pen ${
                active ? "border-ink text-ink" : "border-transparent text-pencil hover:text-ink"
              }`}
            >
              {tab.label} <span className="ml-0.5 tabular-nums text-pencil/70">{counts[tab.key]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
