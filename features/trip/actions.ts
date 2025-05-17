"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

import prisma from "@/lib/db"
import { TRIP_CIRCLE } from "@/lib/keys"
import { actionClient } from "@/lib/safe-action"
import { createUniqueInviteCode, generateClietId } from "@/lib/server-utils"

import { createTripSchema, tripMemberSchema } from "./schema"

export const createTrip = actionClient
  .metadata({ actionName: "createTrip" })
  .schema(createTripSchema)
  .action(async ({ parsedInput }) => {
    const inviteCode = await createUniqueInviteCode()

    const trip = await prisma.tripCircle.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        startDate: parsedInput.startDate
          ? new Date(parsedInput.startDate)
          : undefined,
        endDate: parsedInput.endDate
          ? new Date(parsedInput.endDate)
          : undefined,
        inviteCode,
      },
    })

    // save the trip id in cookies
    // so that if the user did not add their name,
    // they can be prompted to enter it the next time they visit /create
    if (trip?.id) {
      cookies().set({
        name: TRIP_CIRCLE.ID_KEY,
        value: trip.id,
        httpOnly: true,
      })
    }

    return trip
  })

export const addTripMember = actionClient
  .metadata({ actionName: "addTripMember" })
  .schema(tripMemberSchema)
  .action(async ({ parsedInput }) => {
    const clientId = generateClietId()

    const member = await prisma.tripMember.create({
      data: {
        tripCircleId: parsedInput.tripCircleId,
        username: parsedInput.username,
        clientId,
        isOrganizer: true,
      },
    })

    if (member?.id) {
      cookies().delete(TRIP_CIRCLE.ID_KEY)

      cookies().set({
        name: TRIP_CIRCLE.CLIENT_ID_KEY,
        value: clientId,
        httpOnly: true,
      })
    }

    revalidatePath("/create")

    return member
  })

export async function updateShareLinkModalStatus() {
  cookies().set({
    name: TRIP_CIRCLE.SHARE_LINK_DIALOG_STATUS,
    value: "true",
    httpOnly: true,
  })
}
