"use client"

import {
  Board,
  Suggestion,
  SuggestionComment,
  TripCircle,
  TripMember,
  Vote,
} from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

export interface TripCircleResponse extends TripCircle {
  members: TripMember[]
  boards: Array<
    Board & {
      suggestions: Array<
        Suggestion & {
          author: TripMember
          votes: Vote[]
          comments: Array<SuggestionComment & { author: TripMember }>
        }
      >
    }
  >
}

async function getTripCircle() {
  const response = await apiClient.get<TripCircleResponse>("/trips")

  return response.data
}

export function useTripCircle() {
  return useQuery({
    queryKey: ["trip-circle"],
    queryFn: getTripCircle,
  })
}
