import type { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { JoinTripForm } from "@/features/trip/join-trip-form"
import { TripMemberForm } from "@/features/trip/trip-member-form"

import { TRIP_CIRCLE } from "@/lib/keys"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavBar } from "@/components/site-navbar"

export const metadata: Metadata = {
  title: "Join A Trip",
}

interface PageProps {
  searchParams: Promise<{ code?: string }>
}

async function JoinTripPage({ searchParams }: PageProps) {
  const pageSearchParams = await searchParams

  const cookieStore = await cookies()

  const tripCircleCookie = cookieStore.get(TRIP_CIRCLE.ID_KEY)
  const tripCircleClientCookie = cookieStore.get(
    TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY
  )

  return (
    <>
      <SiteNavBar />
      <main className="container mx-auto min-h-screen max-w-lg space-y-6 px-4 py-10 md:px-6">
        <div>
          <h1 className="text-center text-3xl font-bold">TripCircle</h1>
          <p className="text-muted-foreground text-center">
            Plan your next adventure together
          </p>
        </div>
        <Tabs
          defaultValue="/join"
          className="flex w-full items-center justify-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="/create" asChild>
              <Link href="/create">Create New</Link>
            </TabsTrigger>
            <TabsTrigger value="/join" asChild>
              <Link href="/join">Join with Code</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {tripCircleCookie?.value && !tripCircleClientCookie?.value ? (
          <TripMemberForm tripCircleId={tripCircleCookie.value} />
        ) : (
          <JoinTripForm inviteCode={pageSearchParams.code} />
        )}
      </main>
      <SiteFooter />
    </>
  )
}

export default JoinTripPage
