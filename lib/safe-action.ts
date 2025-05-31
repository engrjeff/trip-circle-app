import { cookies, headers } from "next/headers"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action"
import * as z from "zod"

import { auth } from "./auth"
import { TRIP_CIRCLE } from "./keys"

class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message)

    if (e instanceof PrismaClientKnownRequestError) {
    }

    // if (e instanceof AuthError) {
    //   switch (e.type) {
    //     case "CredentialsSignin":
    //       return "Invalid credentials"
    //     case "AccessDenied":
    //       return "Invalid credentials"
    //     default:
    //       return "Something went wrong"
    //   }
    // }

    if (e instanceof ActionError) {
      return e.message
    }

    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    })
  },
  // Define logging middleware.
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({ headers: await headers() })

  const cookieStore = await cookies()

  const tripCircleCookie = cookieStore.get(TRIP_CIRCLE.ID_KEY)

  if (!session?.user?.id) {
    // check first for cookie
    const memberCookie = cookieStore.get(TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY)

    if (memberCookie?.value) {
      return next({
        ctx: {
          type: "member",
          clientId: memberCookie.value,
          tripCircleId: tripCircleCookie?.value,
        },
      })
    }

    throw new Error("Session not found.")
  }

  return next({
    ctx: {
      type: "user",
      clientId: session.user.id,
      tripCircleId: tripCircleCookie?.value,
    },
  })
})
