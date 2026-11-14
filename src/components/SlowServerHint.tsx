import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

/**
 * The backend runs on Render's free tier and sleeps when idle, so the first
 * request can take ~30-60s. Render this while a request is running: it shows
 * a friendly hint if the request is still going after a few seconds.
 */
export default function SlowServerHint({ delayMs = 3500 }: { delayMs?: number }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  if (!show) return null

  return (
    <div
      role="status"
      className="mt-4 flex items-start gap-2.5 rounded border border-rule bg-sheet p-3 text-sm text-pencil"
    >
      <Loader2 size={16} className="mt-0.5 shrink-0 animate-spin" />
      <span>The server is starting up after being idle. This can take up to a minute.</span>
    </div>
  )
}
