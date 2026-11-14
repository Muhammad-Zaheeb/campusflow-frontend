import { LogOut } from "lucide-react"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import { logout } from "../services/authService"

export default function Navbar({ userName }: { userName?: string }) {
  const initials = (userName || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />

          {userName && (
            <div className="hidden items-center gap-2 pl-2 sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {initials || "?"}
              </span>
              <span className="max-w-[10rem] truncate text-sm font-medium">{userName}</span>
            </div>
          )}

          <button type="button" onClick={logout} className="icon-btn" aria-label="Log out" title="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
