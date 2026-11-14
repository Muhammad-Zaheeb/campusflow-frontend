import type { ReactNode } from "react"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"

type Props = {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export default function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 py-5 sm:px-10">
        <Logo />
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-6 sm:items-center sm:pt-0">
        <div className="w-full max-w-sm">
          <h1 className="text-[32px] font-medium leading-tight tracking-[-0.02em]">{title}</h1>
          <p className="mt-2 text-pencil">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <p className="mt-10 text-sm text-pencil">{footer}</p>
        </div>
      </main>
    </div>
  )
}
