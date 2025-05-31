"use client"

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
import { SubmitButton } from "@/components/ui/submit-button"
import { Textarea } from "@/components/ui/textarea"

export function SuggestionCommentBox({
  comments,
}: {
  comments: Array<SuggestionComment & { author: TripMember }>
}) {
  return (
    <Popover>
      <div className="flex items-center gap-1">
        <PopoverTrigger asChild>
          <Button variant="ghost" size="iconSm">
            <MessageSquareIcon />
          </Button>
        </PopoverTrigger>
        <NumberFlow
          value={comments.length}
          className="text-muted-foreground text-sm"
        />
      </div>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-2">
          <h4 className="font-medium">Comments</h4>
          <div className="max-h-40 space-y-2 overflow-y-auto empty:hidden">
            {comments.map((comment) => (
              <div key={comment.id} className="border-t py-2 text-sm">
                <div className="flex items-center gap-1">
                  <Avatar className="size-5">
                    <AvatarImage src={"#"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                      {getInitials(comment.author.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold">
                    {comment.author.username}
                  </span>
                </div>
                <p className="mt-1">{comment.content}</p>
              </div>
            ))}
          </div>
          <form className="space-y-2">
            <Textarea
              aria-label="comment"
              placeholder="Add a comment..."
              className="text-sm"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" size="sm" variant="ghost" className="h-8">
                Cancel
              </Button>
              <SubmitButton size="sm" className="h-8">
                Send
              </SubmitButton>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
