import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import prisma from "@/lib/db"
import { TRIP_CIRCLE } from "@/lib/keys"

export const dynamic = "force-dynamic"

export async function GET() {
  const cookieStore = await cookies()

  const tripCircleCookie = cookieStore.get(TRIP_CIRCLE.ID_KEY)

  if (!tripCircleCookie?.value) {
    return NextResponse.json(
      { error: "Trip circle not found" },
      { status: 404 }
    )
  }

  const trip = await prisma.tripCircle.findUnique({
    where: { id: tripCircleCookie.value },
    include: {
      members: true,
      boards: {
        include: {
          suggestions: {
            include: {
              author: true,
              votes: true,
              comments: { include: { author: true } },
            },
          },
        },
      },
    },
  })

  return NextResponse.json(trip)
}
