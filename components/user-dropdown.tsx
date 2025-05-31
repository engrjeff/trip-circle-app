"use client"

import { CircleUserRoundIcon, LogOutIcon } from "lucide-react"

import { apiClient } from "@/lib/api-client"
import { signOut } from "@/lib/auth-client"
import { useTripCircleClient } from "@/hooks/use-trip-circle-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"

export function UserDropdown() {
  const tripClientQuery = useTripCircleClient()

  if (tripClientQuery.isLoading)
    return (
      <Skeleton
        role="progressbar"
        className="size-9"
        aria-label="loading user"
      />
    )

  async function handleLogout() {
    try {
      await apiClient.post("/logout")
      await signOut()

      window.location.reload()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" aria-label="Open user menu">
          <CircleUserRoundIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-w-64">
        <DropdownMenuLabel className="flex items-start gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              @{tripClientQuery.data?.username}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
