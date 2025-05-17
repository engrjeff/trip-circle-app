/* eslint-disable @next/next/no-img-element */
"use client"

import { HeartIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { SuggestionCommentBox } from "./suggestion-comment-box"

const boardPanels = [
  {
    label: "🗺️ Where to go",
    id: "where-to-go",
  },
  {
    label: "🍔 Where to eat",
    id: "where-to-eat",
  },
  {
    label: "🏠 Where to stay",
    id: "where-to-stay",
  },
  {
    label: "🎒 What to bring",
    id: "where-to-bring",
  },
  {
    label: "🎯 Things to do",
    id: "things-to-do",
  },
]

const imageSample =
  "https://res.cloudinary.com/abide-in-the-vine/image/upload/q_40/v1681477103/the-upright_czuu0s.png"

export default function SuggestionBoard() {
  return (
    <div className="grid min-h-screen w-full grid-cols-5 gap-1 rounded-md border p-1">
      {boardPanels.map((panel) => (
        <div
          key={panel.id}
          className="group space-y-1 overflow-hidden rounded text-left"
        >
          <div className="bg-secondary p-2 text-center">
            <p className="font-semibold">{panel.label}</p>
          </div>
          <div className="bg-secondary h-full space-y-2 p-2">
            <SuggestionCard />
            <SuggestionCard noLink />
            <Button
              variant="ghost"
              className="hover:bg-primary hover:text-primary-foreground w-full justify-start opacity-0 transition-opacity group-hover:opacity-100"
            >
              <PlusIcon /> Add Suggestion
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function SuggestionCard({ noLink }: { noLink?: boolean }) {
  if (noLink)
    return (
      <div className="bg-background text-card-foreground group flex flex-col gap-4 overflow-hidden rounded-md border shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="p-4 pb-0 text-left">
          <div className="mb-2 font-semibold leading-none">
            Somewhere Only We Know
          </div>
          <div className="text-muted-foreground text-xs">
            By <span className="text-primary font-semibold">@jeff</span>
          </div>
        </div>
        <div className="flex items-center gap-1 p-2">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <HeartIcon size={16} className="mr-1" />
            <span>{2}</span>
          </Button>
          <SuggestionCommentBox />
        </div>
      </div>
    )

  return (
    <div className="bg-background text-card-foreground group flex flex-col gap-4 overflow-hidden rounded-md border shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/10 transition-colors group-hover:bg-black/20"></div>
        <img src={imageSample} alt="test" />
      </div>
      <div className="px-4 text-left">
        <div className="mb-2 font-semibold leading-none">Siargao Beach</div>
        <div className="text-muted-foreground text-xs">
          By <span className="text-primary font-semibold">@kimlopez</span>
        </div>
      </div>
      <div className="flex items-center gap-1 p-2">
        <Button variant="ghost" size="sm" className="h-8 px-2">
          <HeartIcon size={16} className="mr-1" />
          <span>{2}</span>
        </Button>
        <SuggestionCommentBox />
      </div>
    </div>
  )
}
