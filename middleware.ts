import { cookies, headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { auth } from "./lib/auth"
import { TRIP_CIRCLE } from "./lib/keys"

const TRIP_START_ROUTES = ["/create", "/join"]

const AUTH_ROUTES = ["/sign-in", "/sign-up"]

const PUBLIC_ROUTES = ["/"]

const PRIVATE_ROUTES = ["/trips"]

export async function middleware(request: NextRequest) {
  if (PRIVATE_ROUTES.includes(request.nextUrl.pathname)) {
    // get the session
    const session = await auth.api.getSession({ headers: await headers() })

    if (!session?.user?.id)
      return NextResponse.redirect(new URL("/sign-in", request.url))

    return NextResponse.next()
  }

  const isAuthPage = AUTH_ROUTES.includes(request.nextUrl.pathname)
  const isPublicPage = PUBLIC_ROUTES.includes(request.nextUrl.pathname)

  const cookieStore = await cookies()

  const tripCircleId = cookieStore.get(TRIP_CIRCLE.ID_KEY)
  const tripCircleClientId = cookieStore.get(TRIP_CIRCLE.CLIENT_MEMBER_ID_KEY)

  const withTripCircle = tripCircleId?.value !== undefined
  const withTripCircleClient = tripCircleClientId?.value !== undefined

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  if (withTripCircle && !withTripCircleClient) {
    return NextResponse.next()
  }

  if (isPublicPage) {
    return NextResponse.next()
  }

  if (!withTripCircle && isAuthPage) {
    return NextResponse.next()
  }

  if (
    !withTripCircle &&
    !isAuthPage &&
    !TRIP_START_ROUTES.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/create", request.url))
  }

  if (withTripCircle && !request.nextUrl.pathname?.startsWith("/trips")) {
    return NextResponse.redirect(
      new URL(`/trips/${tripCircleId?.value}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    // "/(api|trpc)(.*)",
  ], // Apply middleware to specific routes
}
