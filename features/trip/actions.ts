"use server"

import { cookies, headers } from "next/headers"

import { DEFAULT_BOARDS } from "@/config/constants"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { TRIP_CIRCLE } from "@/lib/keys"
import { actionClient } from "@/lib/safe-action"
import { createUniqueInviteCode } from "@/lib/server-utils"

import { createTripSchema, joinTripSchema, tripMemberSchema } from "./schema"

export const createTrip = actionClient
  .metadata({ actionName: "createTrip" })
  .schema(createTripSchema)
  .action(async ({ parsedInput }) => {
    // NOTE: use the session if there's any
    const session = await auth.api.getSession({ headers: await headers() })

    let userId = session?.user?.id

    if (!userId) {
      const anonUser = await auth.api.signInAnonymous()
      userId = anonUser?.user.id
    }

    if (!userId) throw new Error("Unauthorized.")

    const inviteCode = await createUniqueInviteCode()

    const trip = await prisma.tripCircle.create({
      include: {
        members: { select: { id: true, username: true } },
      },
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
        organizedById: userId,
        members: {
          create: {
            username: parsedInput.organizerName,
            userId: userId,
          },
        },
      },
    })

    if (trip?.id) {
      // create the board
      await prisma.board.createMany({
        data: DEFAULT_BOARDS.map(({ title, type, description }) => ({
          title,
          type,
          description,
          tripCircleId: trip.id,
        })),
      })

      const cookieStore = await cookies()

      cookieStore.set({
        name: TRIP_CIRCLE.ID_KEY,
        value: trip.id,
        httpOnly: true,
      })

      cookieStore.set({
        name: TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY,
        value: trip.members[0].id,
        httpOnly: true,
      })
    }

    return trip
  })

export const joinTrip = actionClient
  .metadata({ actionName: "joinTrip" })
  .schema(joinTripSchema)
  .action(async ({ parsedInput: { inviteCode } }) => {
    const tripCircle = await prisma.tripCircle.findUnique({
      where: {
        inviteCode,
      },
    })

    if (!tripCircle) {
      throw new Error("Trip not found.")
    }

    if (tripCircle?.id) {
      const cookieStore = await cookies()

      cookieStore.set({
        name: TRIP_CIRCLE.ID_KEY,
        value: tripCircle.id,
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
    }

    return tripCircle
  })

export const addTripMember = actionClient
  .metadata({ actionName: "addTripMember" })
  .schema(tripMemberSchema)
  .action(async ({ parsedInput: { username, tripCircleId } }) => {
    // check if the trip member already exists in the trip
    const existingTripMember = await prisma.tripMember.findFirst({
      where: {
        username,
        tripCircleId,
      },
    })

    if (existingTripMember) {
      const cookieStore = await cookies()

      cookieStore.set({
        name: TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY,
        value: existingTripMember.id,
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })

      return existingTripMember
    }

    const tripMember = await prisma.tripMember.create({
      data: {
        username,
        tripCircleId,
      },
    })

    if (tripMember?.id) {
      // save the trip member id in cookies
      // we will use this to identify the user
      // when they visit the trip board
      const cookieStore = await cookies()

      cookieStore.set({
        name: TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY,
        value: tripMember.id,
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      })
    }

    return tripMember
  })

export async function updateShareLinkModalStatus() {
  const cookieStore = await cookies()

  cookieStore.set({
    name: TRIP_CIRCLE.SHARE_LINK_DIALOG_STATUS,
    value: "true",
    httpOnly: true,
  })
}
