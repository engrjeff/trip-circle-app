"use client"

import { useTripCircle } from "@/hooks/use-trip-circle"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

import { SuggestionFormDialog } from "./suggestion-form-dialog"
import { SuggestionList } from "./suggestion-list"

export default function SuggestionBoard() {
  const tripQuery = useTripCircle()

  if (tripQuery.isLoading) {
    return (
      <div
        role="progressbar"
        className="grid size-full max-h-full grid-cols-5 gap-4 pt-1"
      >
        {[1, 2, 3, 4, 5].map((n) => {
          return (
            <div
              key={`trip-suggestion-board-skeleton-${n}`}
              className="flex flex-col gap-3"
            >
              <Skeleton className="h-11 bg-gray-100 dark:bg-neutral-900" />
              <Skeleton className="flex-1 bg-gray-100 dark:bg-neutral-900" />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="scroll-snap-x scroll-snap-mandatory grid max-h-full max-w-full shrink-0 grid-cols-[repeat(5,95%)] gap-1 overflow-x-auto lg:grid-cols-5">
      {tripQuery.data?.boards?.map((board) => (
        <div
          key={board.id}
          className="scroll-snap-start group flex size-full shrink-0 flex-col rounded text-left"
        >
          <div className="flex justify-between items-center p-2 pr-3">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{board.title}</p>
              <Badge
                variant="secondary"
                className="shrink-0 rounded-full px-1.5 text-center"
              >
                {board.suggestions.length}
              </Badge>
            </div>
            <SuggestionFormDialog board={board} small />
          </div>
          <ScrollArea className="max-h-[500px] pr-3">
            <div className="flex flex-col gap-2 pb-4">
              <SuggestionList suggestions={board.suggestions} />
              <SuggestionFormDialog board={board} />
            </div>
          </ScrollArea>
        </div>
      ))}
    </div>
  )
}
