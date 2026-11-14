export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <rect x="2" y="2" width="28" height="28" rx="9" className="fill-ink" />
        <path d="M10 16.5l4 4 8-9" fill="none" className="stroke-marker" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight">CampusFlow</span>
    </div>
  )
}
