import { z } from "zod"

export const createTripSchema = z.object({
  title: z
    .string({ required_error: "Trip name is required." })
    .nonempty({ message: "Trip name is required." }),
  description: z.string().optional(),
  startDate: z
    .string()
    .datetime({ local: true, message: "Invalid start date." })
    .optional(),
  endDate: z
    .string()
    .datetime({ local: true, message: "Invalid end date." })
    .optional(),
  organizerName: z
    .string({ required_error: "Name is required." })
    .nonempty({ message: "Name is required." }),
})

export type CreateTripInputs = z.infer<typeof createTripSchema>

export const joinTripSchema = z.object({
  inviteCode: z
    .string({ required_error: "Invite code is required." })
    .nonempty({ message: "Invite code is required." }),
})

export type JoinTripInputs = z.infer<typeof joinTripSchema>

// used for non-authed members
export const tripMemberSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .nonempty({ message: "Username is required." }),
  tripCircleId: z
    .string({ required_error: "Trip ID is required." })
    .nonempty({ message: "Trip ID is required." }),
})

export type TripMemberInputs = z.infer<typeof tripMemberSchema>
