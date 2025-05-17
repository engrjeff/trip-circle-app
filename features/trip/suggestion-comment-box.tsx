"use client"

import { MessageSquareIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SuggestionCommentBox() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="px-2">
          <MessageSquareIcon size={16} className="mr-1" />
          <span>{2}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-2">
          <h4 className="font-medium">Comments</h4>
          <div className="max-h-40 space-y-2 overflow-y-auto">
            <div className="border-t py-2 text-sm">
              <div className="flex items-center gap-1">
                <Avatar className="size-5">
                  <AvatarImage src={"#"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                    KL
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold">Kim Lopez</span>
              </div>
              <p className="mt-1">Mukhang okay here ah.</p>
            </div>
            <div className="border-t py-2 text-sm">
              <div className="flex items-center gap-1">
                <Avatar className="size-5">
                  <AvatarImage src={"#"} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                    JS
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold">Jeff Segovia</span>
              </div>
              <p className="mt-1">Yup! hanap pa ako 🙂</p>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Input placeholder="Add a comment..." className="text-sm" />
            <Button size="sm" className="h-9">
              Send
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
