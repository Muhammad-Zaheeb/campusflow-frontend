/** @type {import('tailwindcss').Config} */

// Colors come from CSS variables in src/index.css, so light ("paper & ballpoint")
// and dark ("chalkboard") themes swap in one place.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: v("paper"), // page background
        sheet: v("sheet"), // panels, inputs, dialogs
        ink: v("ink"), // main text
        pencil: v("pencil"), // secondary text
        rule: v("rule"), // lines and borders
        pen: v("pen"), // ballpoint blue: actions, links, checkmarks
        "pen-strong": v("pen-strong"),
        "on-pen": v("on-pen"),
        marker: v("marker"), // highlighter yellow: only for "due today"
        "on-marker": v("on-marker"),
        redpen: v("redpen"), // overdue, high priority, delete
      },
      fontFamily: {
        sans: ['"Instrument Sans Variable"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "10px",
      },
      keyframes: {
        "dialog-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "dialog-in": "dialog-in 160ms ease-out",
      },
    },
  },
  plugins: [],
}
