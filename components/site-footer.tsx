import Link from "next/link"

import { Separator } from "@/components/ui/separator"

const footerLinks = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
  {
    title: "Contact Us",
    href: "#",
  },
]

export function SiteFooter() {
  return (
    <footer>
      <Separator />

      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-start py-12">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            TripCircle
          </Link>

          <ul className="mt-6 flex flex-wrap items-center gap-4">
            {footerLinks.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className="text-muted-foreground hover:text-foreground font-medium"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              TripCircle
            </Link>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
