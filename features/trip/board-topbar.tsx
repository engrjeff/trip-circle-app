import Link from "next/link"
import { CircleUserRoundIcon, LogOutIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ShareTripDialog } from "./share-trip-dialog"

export function BoardTopBar() {
  return (
    <header className="flex items-center py-6">
      <Link href="/" className="text-lg font-bold">
        TripCircle
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Button size="sm">View Final Plan</Button>
        <ShareTripDialog tripCode="ABC123" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open user menu">
              <CircleUserRoundIcon size={16} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-w-64">
            <DropdownMenuLabel className="flex items-start gap-3">
              <div className="flex min-w-0 flex-col">
                <span className="text-foreground truncate text-sm font-medium">
                  @jeffsegovia
                </span>
                <span className="text-muted-foreground truncate text-xs font-normal">
                  jeff@gmail.com
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
