import Link from "next/link"

import { Button } from "@/components/ui/button"
import { UserDropdown } from "@/components/user-dropdown"

import { ShareTripDialog } from "./share-trip-dialog"

export function BoardTopBar() {
  return (
    <header className="flex items-center py-6">
      <Link href="/" className="text-lg font-bold">
        TripCircle
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Button size="sm">View Final Plan</Button>
        <ShareTripDialog inviteCode="ABC123" />
        <UserDropdown />
      </div>
    </header>
  )
}
