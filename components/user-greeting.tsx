"use client"

import { useTripCircleClient } from "@/hooks/use-trip-circle-client"

export function UserGreeting() {
  const tripCircleClientQuerfy = useTripCircleClient()

  if (!tripCircleClientQuerfy.data) return null

  return (
    <p className="hidden font-semibold md:block">
      Hi, <span>{tripCircleClientQuerfy.data.username}</span> 👋!
    </p>
  )
}
