import { PrismaClient } from "@prisma/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { anonymous } from "better-auth/plugins"

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  appName: "TripCircle",
  emailAndPassword: { enabled: true },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [anonymous()],
})
