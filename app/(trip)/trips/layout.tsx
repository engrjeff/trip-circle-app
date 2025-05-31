import * as React from "react"
import Link from "next/link"

import { ThemeToggler } from "@/components/theme-toggler"
import { UserDropdown } from "@/components/user-dropdown"
import { UserGreeting } from "@/components/user-greeting"

function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto flex h-screen max-w-(--breakpoint-xl) flex-col px-4 pb-6 md:px-6">
      <header className="flex items-center py-6">
        <Link href="/" className="text-lg font-bold">
          TripCircle
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <UserGreeting />
          <ThemeToggler />
          <UserDropdown />
        </div>
      </header>
      <main className="max-h-[100%-84px] flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default BoardLayout
