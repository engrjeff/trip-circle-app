import { type Metadata } from "next"
import Link from "next/link"

import { site } from "@/config/site"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: `Welcome to ${site.title}`,
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
        {/* Announcement Banner */}
        <div className="flex justify-center">
          <a
            className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
            href="#"
          >
            Get started for free. No credit card required.
            <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
              <svg
                className="size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>
        {/* End Announcement Banner */}
        {/* Title */}
        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Plan trips together, the fun and easy way.
          </h1>
        </div>
        {/* End Title */}
        <div className="mx-auto mt-5 max-w-3xl text-center">
          <p className="text-muted-foreground text-xl">
            Create a private Trip Circle, invite friends, share ideas, and vote
            on where to go, what to eat, and what to bring — all in one
            beautiful board.
          </p>
        </div>
        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <Button size={"lg"} asChild>
            <Link href="/create">Create a Trip</Link>
          </Button>
          <Button size={"lg"} variant={"outline"}>
            Learn more
          </Button>
        </div>
      </div>
      {/* End Hero */}
    </>
  )
}
