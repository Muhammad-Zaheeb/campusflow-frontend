export default function TaskSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="divide-y divide-rule border-t border-rule" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex animate-pulse gap-3.5 py-4">
          <div className="h-[18px] w-[18px] rounded-full bg-rule" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/3 rounded bg-rule" />
            <div className="h-3 w-2/3 rounded bg-rule/60" />
          </div>
        </div>
      ))}
    </div>
  )
}
