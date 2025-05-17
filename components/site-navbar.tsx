import Link from "next/link"

import { ThemeToggler } from "./theme-toggler"
import { Button } from "./ui/button"

export function SiteNavBar() {
  return (
    <header className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <nav className="flex items-center">
        <Link href="/" className="text-lg font-bold">
          TripCircle
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="link" className="text-foreground">
            <Link href="/">Features</Link>
          </Button>
          <Button asChild variant="link" className="text-foreground">
            <Link href="/">Pricing</Link>
          </Button>
          <Button asChild variant="link" className="text-foreground">
            <Link href="/">About</Link>
          </Button>
          <Button asChild variant="link" className="text-foreground">
            <Link href="/">Contact Us</Link>
          </Button>

          <div className="ml-auto flex items-center gap-4">
            <Button asChild>
              <Link href="/create">Create Trip</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/join">Join a Trip</Link>
            </Button>
            <ThemeToggler />
          </div>
        </div>
      </nav>
    </header>
  )
}
