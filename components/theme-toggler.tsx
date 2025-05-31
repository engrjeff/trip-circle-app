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
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <MoonIcon size={16} aria-hidden="true" />
      ) : (
        <SunIcon size={16} aria-hidden="true" />
      )}
    </Button>
  )
}
