import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { TRIP_CIRCLE } from "@/lib/keys"

export async function POST() {
  const cookieStore = await cookies()

  cookieStore.delete(TRIP_CIRCLE.ID_KEY)
  cookieStore.delete(TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY)
  cookieStore.delete(TRIP_CIRCLE.SHARE_LINK_DIALOG_STATUS)

  return NextResponse.json({ ok: true })
}
