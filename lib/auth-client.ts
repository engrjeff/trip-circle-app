import { anonymousClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient({
  plugins: [anonymousClient()],
})

export const { useSession, signOut } = authClient
