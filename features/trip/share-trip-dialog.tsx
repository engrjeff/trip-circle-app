"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ShareTripDialogProps {
  inviteCode: string
}

export function ShareTripDialog({ inviteCode }: ShareTripDialogProps) {
  const [open, setOpen] = useState(false)

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}?code=${inviteCode}`

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard!")
        setOpen(false)
      })
      .catch(() => {
        toast.error("Failed to copy link")
      })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="size-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Trip Circle</DialogTitle>
          <DialogDescription>
            Anyone with this link can join your Trip Circle using code:{" "}
            <span className="font-semibold">{inviteCode}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex items-center gap-2">
          <Input value={shareUrl} readOnly className="flex-1" />
          <Button onClick={copyToClipboard} className="shrink-0">
            Copy Link
          </Button>
        </div>
        <p className="text-muted-foreground text-center text-sm">
          Share this link with your friends to start planning together!
        </p>
      </DialogContent>
    </Dialog>
  )
}
