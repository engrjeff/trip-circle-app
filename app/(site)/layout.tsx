import * as React from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteNavBar } from "@/components/site-navbar"

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavBar />
      <main className="min-h-screen">{children}</main>
      <SiteFooter />
    </>
  )
}

export default SiteLayout
