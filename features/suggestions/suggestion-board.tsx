"use client"

import { useTripCircle } from "@/hooks/use-trip-circle"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SuggestionFormDialog } from "./suggestion-form-dialog"
import { SuggestionList } from "./suggestion-list"

export function SuggestionBoardTest() {
  const tripQuery = useTripCircle()

  return (
    <Tabs defaultValue={tripQuery.data?.boards?.at(0)?.id}>
      <ScrollArea>
        <TabsList className="mb-3 h-auto w-full gap-2 rounded-none border-b bg-transparent px-0 py-1 text-foreground">
          {tripQuery.data?.boards?.map((board) => (
            <TabsTrigger
              key={board.id}
              value={board.id}
              className="hover:bg-accent hover:text-foreground data-[state=active]:border-accent data-[state=active]:bg-accent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent dark:data-[state=active]:bg-accent"
            >
              {board.title}
              <Badge
                className="ms-1.5 min-w-5 bg-primary/15 px-1"
                variant="secondary"
              >
                {board.suggestions.length}
              </Badge>
              <SuggestionFormDialog board={board} small />
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {tripQuery.data?.boards?.map((board) => (
        <TabsContent key={board.id} value={board.id}>
          <ScrollArea className="max-h-[500px] pr-3">
            <div className="flex flex-col gap-2 pb-4">
              <SuggestionList suggestions={board.suggestions} />
              <SuggestionFormDialog board={board} />
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export function SuggestionBoard() {
  const tripQuery = useTripCircle()

  if (tripQuery.isLoading) {
    return (
      <div
        role="progressbar"
        className="grid size-full max-h-full grid-cols-[repeat(5,95%)] gap-1 pt-1 lg:grid-cols-5 lg:gap-4"
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
          <div className="flex items-center justify-between p-2 pr-3">
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
          <ScrollArea className="pr-3 md:max-h-[500px]">
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
