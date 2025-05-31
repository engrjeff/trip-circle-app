"use client"

import { useOptimistic } from "react"
import NumberFlow from "@number-flow/react"
import { Vote } from "@prisma/client"
import { useQueryClient } from "@tanstack/react-query"
import { HeartIcon } from "lucide-react"

import { useTripCircleClient } from "@/hooks/use-trip-circle-client"
import { Button } from "@/components/ui/button"

import { addSuggestionVote, removeSuggestionVote } from "./actions"

export function VoteButton({
  suggestionId,
  votes,
}: {
  suggestionId: string
  votes: Vote[]
}) {
  const tripCircleClient = useTripCircleClient()

  const queryClient = useQueryClient()

  const [optimisticVotes, setOptimisticVotes] = useOptimistic<
    string[],
    { type: "add" | "remove"; memberId: string }
  >(
    votes.map((v) => v.memberId),
    (state, action) => {
      return action.type === "add"
        ? [...state, action.memberId]
        : state.filter((v) => v !== action.memberId)
    }
  )

  const hasVoted = votes.some(
    (vote) => vote.memberId === tripCircleClient.data?.id
  )

  const handleVote = async () => {
    if (!tripCircleClient.data?.id) return

    if (!hasVoted) {
      setOptimisticVotes({ type: "add", memberId: tripCircleClient.data?.id })
      await addSuggestionVote({ id: suggestionId })
    } else {
      const memberVote = votes.find(
        (v) => v.memberId === tripCircleClient.data?.id
      )

      if (!memberVote) return

      setOptimisticVotes({
        type: "remove",
        memberId: tripCircleClient.data?.id,
      })
      await removeSuggestionVote({ id: memberVote.id })
    }

    await queryClient.invalidateQueries({ queryKey: ["trip-circle"] })
  }

  return (
    <form action={handleVote} className="flex items-center gap-1">
      <Button type="submit" variant="ghost" size="iconSm">
        <HeartIcon
          size={16}
          className={
            optimisticVotes.length > 0 ? "fill-red-500 text-red-500" : ""
          }
        />
      </Button>
      <NumberFlow
        value={optimisticVotes.length}
        className="text-muted-foreground text-sm"
      />
    </form>
  )
}
