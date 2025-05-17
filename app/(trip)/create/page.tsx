import type { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AddTripMemberForm } from "@/features/trip/add-trip-member-form"
import { CreateTripForm } from "@/features/trip/create-trip-form"

import { TRIP_CIRCLE } from "@/lib/keys"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavBar } from "@/components/site-navbar"

export const metadata: Metadata = {
  title: "Create A Trip",
}

function CreateTripPage() {
  const tripCircleClientId = cookies().get(TRIP_CIRCLE.CLIENT_ID_KEY)

  if (tripCircleClientId?.value) redirect("/board")

  const tripCircleId = cookies().get(TRIP_CIRCLE.ID_KEY)

  const withTrip = Boolean(tripCircleId?.value)

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
          defaultValue="/create"
          className="flex w-full items-center justify-center"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="/create" asChild>
              <Link href="/create">
                {withTrip ? "Add Your Name" : "Create New"}
              </Link>
            </TabsTrigger>
            <TabsTrigger value="/join" asChild>
              <Link href="/join">Join with Code</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {tripCircleId?.value ? (
          <AddTripMemberForm tripCircleId={tripCircleId.value} />
        ) : (
          <CreateTripForm />
        )}
      </main>
      <SiteFooter />
    </>
  )
}

export default CreateTripPage
