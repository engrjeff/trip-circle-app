import { type Metadata } from "next"

import { site } from "@/config/site"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: `Welcome to ${site.title}`,
}

export default function Home() {
  return (
    <main>
      <h1>Hello, World</h1>
      <Button>Click Me</Button>
    </main>
  )
}
