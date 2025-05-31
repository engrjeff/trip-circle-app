import { type Metadata } from "next"
import { cookies, headers } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"
import SuggestionBoard from "@/features/suggestions/suggestion-board"
import { updateShareLinkModalStatus } from "@/features/trip/actions"
import { getTripById } from "@/features/trip/queries"
import { ShareLinkDialogModal } from "@/features/trip/share-link-dialog-modal"
import { ShareTripDialog } from "@/features/trip/share-trip-dialog"
import { TripMembersAvatars } from "@/features/trip/trip-members-avatars"
import { CalendarDaysIcon, SlashIcon } from "lucide-react"

import { auth } from "@/lib/auth"
import { TRIP_CIRCLE } from "@/lib/keys"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Trip",
}

interface TripBoardPageProps {
  params: Promise<{
    id: string
  }>
}

async function TripBoardPage({ params }: TripBoardPageProps) {
  const cookieStore = await cookies()
  const { id } = await params

  const shareModalStatus = cookieStore.get(TRIP_CIRCLE.SHARE_LINK_DIALOG_STATUS)

  const shouldNotShowModal = shareModalStatus?.value === "true"

  const session = await auth.api.getSession({ headers: await headers() })

  const trip = await getTripById(id)

  if (!trip) {
    return notFound()
  }

  return (
    <>
      {session?.user?.id ? (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/trips">My Trips</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{trip.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : null}
      <div className="h-full max-h-full overflow-hidden lg:rounded-md lg:border lg:p-4">
        <div className="flex flex-col gap-4 border-b px-1 pb-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{trip.title}</h1>
              <SlashIcon size={16} />
              <Badge variant="secondary">Code: {trip.inviteCode}</Badge>
            </div>
            {trip.startDate && trip.endDate ? (
              <div className="text-muted-foreground mb-2 flex items-center gap-1 text-sm">
                <CalendarDaysIcon className="size-4" /> Schedule:{" "}
                <time>
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </time>
              </div>
            ) : null}
          </div>
          <div className="flex gap-2 lg:ml-auto lg:items-center">
            <TripMembersAvatars />
            <Button size="sm" className="lg:ml-3">
              View Final Plan
            </Button>
            <ShareTripDialog inviteCode={trip.inviteCode} />
          </div>
        </div>
        <SuggestionBoard />
        {shouldNotShowModal ? null : (
          <ShareLinkDialogModal
            onShareCallback={updateShareLinkModalStatus}
            inviteCode={trip.inviteCode}
          />
        )}
      </div>
    </>
  )
}

export default TripBoardPage
