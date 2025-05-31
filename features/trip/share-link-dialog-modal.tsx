"use client"

import { Share2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ShareLinkDialogModalProps {
  inviteCode: string
  onShareCallback: () => void
}

export function ShareLinkDialogModal({
  inviteCode,
  onShareCallback,
}: ShareLinkDialogModalProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/join?code=${inviteCode}`

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard!")
        onShareCallback()
      })
      .catch(() => {
        toast.error("Failed to copy link")
      })
  }

  return (
    <Dialog
      open={true}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onShareCallback()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="size-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Share Trip Circle</DialogTitle>
          <DialogDescription>
            Anyone with this link can join your Trip Circle using code:{" "}
            <span className="font-semibold">{inviteCode}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 space-y-2">
          <Input value={shareUrl} readOnly className="flex-1" />
          <p className="text-muted-foreground text-sm">
            Share this link with your friends to start planning together!
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onShareCallback()}
            className="shrink-0"
          >
            Take me to Board
          </Button>
          <Button onClick={copyToClipboard} className="shrink-0">
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
