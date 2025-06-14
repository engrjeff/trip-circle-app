"use client"

import { getInitials } from "@/lib/utils"
import { useTripCircle } from "@/hooks/use-trip-circle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TripMembersAvatars() {
  const tripQuery = useTripCircle()

  return (
    <TooltipProvider>
      <div className="hidden items-center gap-2 md:flex">
        <p className="text-sm text-muted-foreground">Members</p>
        <div className="flex -space-x-3">
          {tripQuery.data?.members?.map((member) => (
            <Tooltip key={member.id}>
              <TooltipTrigger>
                <Avatar className="size-8 rounded-full object-cover ring-2 ring-background">
                  <AvatarFallback className="bg-orange-500 text-foreground">
                    {getInitials(member.username)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{member.username}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {/* <Button
          variant="secondary"
          className="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground flex size-10 items-center justify-center rounded-full text-xs ring-2"
          size="icon"
        >
          +3
        </Button> */}
        </div>
      </div>
    </TooltipProvider>
  )
}
