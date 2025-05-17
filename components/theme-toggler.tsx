"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"

export function ThemeToggler() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      className="data-[state=on]:hover:bg-muted group size-9 data-[state=on]:bg-transparent"
      type="button"
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      data-state={theme === "dark" ? "on" : "off"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <MoonIcon
        size={16}
        aria-hidden="true"
        className="hidden group-data-[state=on]:inline-block"
      />
      <SunIcon
        size={16}
        aria-hidden="true"
        className="hidden group-data-[state=off]:inline-block"
      />
    </Button>
  )
}
