"use client"

import { useEffect, useState } from "react"
import NextImage from "next/image"
import { GlobeIcon, Loader2Icon } from "lucide-react"

export function useFaviconOfUrl(url: string) {
  const [favicon, setFavicon] = useState<string>()

  const [pending, setPending] = useState(true)

  useEffect(() => {
    try {
      if (!url) return

      const parsedUrl = new URL(url)

      const hostname = parsedUrl.hostname

      if (!hostname) return

      const image = new Image()

      const src = `https://www.google.com/s2/favicons?domain=${hostname}&sz=256`

      image.src = src

      image
        .decode()
        .then(() => {
          setFavicon(src)
        })
        .finally(() => setPending(false))
    } catch {
      setPending(false)
      return
    }
  }, [url])

  return { favicon, pending }
}

export function FaviconImage({
  url,
  size = 16,
}: {
  url: string
  size?: number
}) {
  const { favicon, pending } = useFaviconOfUrl(url)

  if (!url) return <GlobeIcon size={size} className="text-muted-foreground" />

  if (pending)
    return (
      <Loader2Icon size={size} className="text-muted-foreground animate-spin" />
    )

  if (!favicon)
    return <GlobeIcon size={size} className="text-muted-foreground" />

  return (
    <NextImage
      unoptimized
      src={favicon}
      alt=""
      width={size}
      height={size}
      className="rounded-full object-contain"
    />
  )
}
