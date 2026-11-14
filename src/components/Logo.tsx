import { GraduationCap } from "lucide-react"

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const big = size === "lg"
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid place-items-center rounded-xl bg-indigo-600 text-white shadow-sm ${
          big ? "h-11 w-11" : "h-9 w-9"
        }`}
      >
        <GraduationCap size={big ? 24 : 20} />
      </span>
      <span className={`font-bold tracking-tight ${big ? "text-2xl" : "text-lg"}`}>CampusFlow</span>
    </div>
  )
}
