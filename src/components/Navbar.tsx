import useTheme from "../hooks/useTheme"

type NavbarProps = {
  onLogout: () => void
}

export default function Navbar({ onLogout }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold">
          CampusFlow
        </h1>

        <div className="flex gap-3 items-center">

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="
              px-3 py-1 rounded border transition
              bg-gray-100 dark:bg-gray-800
              text-gray-800 dark:text-white
              border-gray-300 dark:border-gray-700
            "
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  )
}