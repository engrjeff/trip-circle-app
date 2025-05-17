import { type Metadata } from "next"
import { cookies } from "next/headers"
import { updateShareLinkModalStatus } from "@/features/trip/actions"
import { ShareLinkDialogModal } from "@/features/trip/share-link-dialog-modal"
import SuggestionBoard from "@/features/trip/suggestion-board"
import { TripMembersAvatars } from "@/features/trip/trip-members-avatars"

import { TRIP_CIRCLE } from "@/lib/keys"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Trip Board",
}

function TripBoardPage() {
  const shareModalStatus = cookies().get(TRIP_CIRCLE.SHARE_LINK_DIALOG_STATUS)

  const shouldNotShowModal = shareModalStatus?.value === "true"

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Vacation at Siargao</h1>
        <Badge>ABC123</Badge>
        <TripMembersAvatars />
        <SuggestionBoard />
        {shouldNotShowModal ? null : (
          <ShareLinkDialogModal
            onShareCallback={updateShareLinkModalStatus}
            inviteCode="123ABC"
          />
        )}
      </div>
    </>
  )
}

export default TripBoardPage
