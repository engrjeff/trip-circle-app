import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Trips",
}

function TripsPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold">My Trips</h1>
      </div>
    </>
  )
}

export default TripsPage
