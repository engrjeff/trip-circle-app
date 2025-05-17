/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"

export function TripMembersAvatars() {
  return (
    <div className="flex -space-x-3">
      {[1, 2, 3].map((n) => (
        <img
          key={n.toString()}
          className="ring-background size-10 rounded-full object-cover ring-2"
          src="https://jeffsegovia.dev/me.jpg"
          width={40}
          height={40}
          alt="Avatar"
        />
      ))}
      <Button
        variant="secondary"
        className="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground flex size-10 items-center justify-center rounded-full text-xs ring-2"
        size="icon"
      >
        +3
      </Button>
    </div>
  )
}
