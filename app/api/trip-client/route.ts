import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import prisma from "@/lib/db"
import { TRIP_CIRCLE } from "@/lib/keys"

export const dynamic = "force-dynamic"

export async function GET() {
  const cookieStore = await cookies()

  const tripCircleClientCookie = cookieStore.get(
    TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY
  )

  if (!tripCircleClientCookie?.value) {
    return NextResponse.json(
      { error: "TripCircle client does not exist" },
      { status: 404 }
    )
  }

  const tripMember = await prisma.tripMember.findUnique({
    where: { id: tripCircleClientCookie.value },
  })

  return NextResponse.json(tripMember)
}
