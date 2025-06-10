"use client"

import { useState } from "react"
import NumberFlow from "@number-flow/react"
import { SuggestionComment, TripMember } from "@prisma/client"
import { MessageSquareIcon } from "lucide-react"

import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { SuggestionCommentForm } from "./suggestion-comment-form"

export function SuggestionCommentBox({
  suggestionId,
  comments,
}: {
  suggestionId: string
  comments: Array<SuggestionComment & { author: TripMember }>
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-1">
        <PopoverTrigger asChild>
          <Button variant="ghost" size="iconSm">
            <MessageSquareIcon />
          </Button>
        </PopoverTrigger>
        <NumberFlow
          value={comments.length}
          className="text-sm text-muted-foreground"
        />
      </div>
      <PopoverContent className="w-80 px-0 pt-2" align="start">
        <div className="space-y-2">
          <h4 className="px-3 text-sm font-semibold">Comments</h4>
          <div className="max-h-40 space-y-2 overflow-y-auto empty:hidden">
            {comments.map((comment) => (
              <div key={comment.id} className="border-t px-3 py-2 text-sm">
                <div className="flex items-center gap-1">
                  <Avatar className="size-4">
                    <AvatarImage src={"#"} />
                    <AvatarFallback className="bg-primary text-[10px] text-primary-foreground uppercase">
                      {getInitials(comment.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold">
                    {comment.author.username}
                  </span>
                </div>
                <p className="mt-1 ml-5">{comment.content}</p>
              </div>
            ))}
          </div>
          <div className="px-4">
            <SuggestionCommentForm
              suggestionId={suggestionId}
              onAfterSave={() => setOpen(false)}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
