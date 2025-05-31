"use client"

import { TripMember } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

import { apiClient } from "@/lib/api-client"

async function getTripCircleClient() {
  const response = await apiClient.get<TripMember>("/trip-client")

  return response.data
}

export function useTripCircleClient() {
  return useQuery({
    queryKey: ["trip-circle-client"],
    queryFn: getTripCircleClient,
  })
}
