import { Suggestion, SuggestionComment, TripMember, Vote } from "@prisma/client"
import { ExternalLinkIcon } from "lucide-react"

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
    <div className="group flex bg-card flex-col gap-4 overflow-hidden rounded-md border transition-all duration-300 hover:shadow-lg">
      <div className="p-4 pb-0 text-left">
        <div className="mb-1 text-sm font-semibold leading-none">
          {suggestion.title}
        </div>
        <div className="text-muted-foreground mb-4 text-xs">
          By{" "}
          <span className="text-primary font-semibold">
            @{suggestion.author.username}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {suggestion.description}
        </p>

        {suggestion.url && (
          <div className="text-muted-foreground mt-2 flex items-center gap-1 text-sm hover:underline">
            <FaviconImage size={16} url={suggestion.url} />{" "}
            <a
              href={suggestion.url}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground inline-flex items-center gap-1 text-sm"
            >
              More info here <ExternalLinkIcon size={12} />
            </a>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 p-2">
        <VoteButton suggestionId={suggestion.id} votes={suggestion.votes} />
        <SuggestionCommentBox comments={suggestion.comments} />
      </div>
    </div>
  )
}
