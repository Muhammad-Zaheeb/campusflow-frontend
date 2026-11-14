import { useCallback, useEffect, useState } from "react"

export type Theme = "light" | "dark"

function currentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

/**
 * Light/dark theme. The initial theme is applied by a small script in index.html
 * (saved choice, otherwise the system setting), so this hook only reads and toggles it.
 */
export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Keep every component using this hook in sync
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(currentTheme()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit
    }
  }, [])

  return { theme, toggleTheme }
}
