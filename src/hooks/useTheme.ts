import { useEffect, useState } from "react"

let globalTheme: "light" | "dark" =
  (localStorage.getItem("theme") as "light" | "dark") || "light"

let listeners: ((t: "light" | "dark") => void)[] = []

const setThemeGlobal = (theme: "light" | "dark") => {
  globalTheme = theme
  localStorage.setItem("theme", theme)

  document.documentElement.classList.toggle("dark", theme === "dark")

  listeners.forEach((l) => l(theme))
}

export default function useTheme() {
  const [theme, setTheme] = useState(globalTheme)

  useEffect(() => {
    const handler = (t: "light" | "dark") => setTheme(t)

    listeners.push(handler)

    document.documentElement.classList.toggle(
      "dark",
      globalTheme === "dark"
    )

    return () => {
      listeners = listeners.filter((l) => l !== handler)
    }
  }, [])

  const toggleTheme = () => {
    setThemeGlobal(globalTheme === "light" ? "dark" : "light")
  }

  return { theme, toggleTheme }
}