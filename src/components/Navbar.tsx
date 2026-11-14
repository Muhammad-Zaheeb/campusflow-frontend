import { LogOut } from "lucide-react"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import { logout } from "../services/authService"

export default function Navbar({ userName }: { userName?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-rule/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-6">
        <Logo />

        <div className="flex items-center gap-1">
          {userName && <span className="mr-2 hidden max-w-[12rem] truncate text-sm text-pencil sm:inline">{userName}</span>}
          <ThemeToggle />
          <button type="button" onClick={logout} className="icon-btn" aria-label="Log out" title="Log out">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  )
}
