"use client"

import { Suggestion, SuggestionComment, TripMember, Vote } from "@prisma/client"
import { AnimatePresence, motion } from "framer-motion"

import { SuggestionCard } from "./suggestion-card"

interface DetailedSuggestion extends Suggestion {
  author: TripMember
  votes: Vote[]
  comments: Array<SuggestionComment & { author: TripMember }>
}

export function SuggestionList({
  suggestions,
}: {
  suggestions: DetailedSuggestion[]
}) {
  const clonedSuggestions = structuredClone(suggestions)

  const sortedSuggestions = clonedSuggestions.sort((a, b) =>
    a.votes.length < b.votes.length ? 1 : -1
  )

  return (
    <ul className="space-y-4 empty:hidden">
      <AnimatePresence>
        {sortedSuggestions.map((suggestion) => (
          <motion.li
            key={suggestion.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", stiffness: 500, damping: 30 }}
          >
            <SuggestionCard suggestion={suggestion} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
