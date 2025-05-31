import { v4 as uuid } from "uuid"

import prisma from "./db"

export function generateInviteCode(length = 6): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // no 0, O, 1, I to avoid confusion
  let code = ""
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function createUniqueInviteCode() {
  let code: string
  let exists = true

  do {
    code = generateInviteCode()
    const existingTrip = await prisma.tripCircle.findUnique({
      where: { inviteCode: code },
    })
    exists = !!existingTrip
  } while (exists)

  return code
}

export function generateClientId() {
  return `trip-circle-client-${uuid()}`
}
