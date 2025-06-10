import { Suggestion, SuggestionComment, TripMember, Vote } from "@prisma/client"
import {
  ExternalLinkIcon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaviconImage } from "@/components/favicon-image"

import { SuggestionCommentBox } from "./suggestion-comment-box"
import { VoteButton } from "./vote-button"

export function SuggestionCard({
  suggestion,
}: {
  suggestion: Suggestion & {
    author: TripMember
    votes: Vote[]
    comments: Array<SuggestionComment & { author: TripMember }>
  }
}) {
  return (
    <div className="group relative flex flex-col gap-4 overflow-hidden rounded-md border bg-card transition-all duration-300 hover:shadow-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="iconSm"
            variant="ghost"
            aria-label="menu"
            className="absolute top-0.5 right-0.5"
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Edit <PencilIcon className="ml-auto size-4" />
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            Delete <TrashIcon className="ml-auto size-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="p-4 pb-0 text-left">
        <div className="mb-1 text-sm leading-none font-semibold">
          {suggestion.title}
        </div>
        <div className="mb-4 text-xs text-muted-foreground">
          By{" "}
          <span className="font-semibold text-primary">
            @{suggestion.author.username}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {suggestion.description}
        </p>

        {suggestion.url && (
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground hover:underline">
            <FaviconImage size={16} url={suggestion.url} />{" "}
            <a
              href={suggestion.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground"
            >
              More info here <ExternalLinkIcon size={12} />
            </a>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-2">
        <VoteButton suggestionId={suggestion.id} votes={suggestion.votes} />
        <SuggestionCommentBox
          suggestionId={suggestion.id}
          comments={suggestion.comments}
        />
      </div>
    </div>
  )
}
