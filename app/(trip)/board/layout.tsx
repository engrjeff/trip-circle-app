import * as React from "react"
import { BoardTopBar } from "@/features/trip/board-topbar"

function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 pb-6 md:px-6">
      <BoardTopBar />
      <main className="min-h-screen">{children}</main>
    </div>
  )
}

export default BoardLayout
