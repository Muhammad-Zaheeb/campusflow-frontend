import { X } from "lucide-react"
import { useEffect, type ReactNode } from "react"

type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  size?: "sm" | "md"
}

export default function Modal({ open, title, onClose, children, size = "md" }: Props) {
  // Close on Escape and stop the page behind from scrolling
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] dark:bg-black/50" onClick={onClose} />
      <div
        className={`relative w-full animate-dialog-in rounded-t-2xl border border-rule bg-sheet p-6 shadow-2xl shadow-ink/10 sm:rounded-2xl sm:p-7 ${
          size === "sm" ? "sm:max-w-sm" : "sm:max-w-lg"
        }`}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          <button type="button" onClick={onClose} className="icon-btn -mr-2" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
