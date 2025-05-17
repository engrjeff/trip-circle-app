"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

import { TripMemberInputs, tripMemberSchema } from "./schema"

interface AddMemberNameDialogProps extends React.ComponentProps<typeof Dialog> {
  tripCircleId: string
}

export function AddMemberNameDialog({
  tripCircleId,
  ...dialogProps
}: AddMemberNameDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How do you want to be called?</DialogTitle>
          <DialogDescription>
            This name will appear on your Trip Circle board.
          </DialogDescription>
        </DialogHeader>
        <MemberNameForm tripCircleId={tripCircleId} />
      </DialogContent>
    </Dialog>
  )
}

function MemberNameForm({ tripCircleId }: { tripCircleId: string }) {
  const form = useForm<TripMemberInputs>({
    resolver: zodResolver(tripMemberSchema),
    defaultValues: {
      username: "",
      clientId: "",
      tripCircleId: tripCircleId,
    },
  })

  const onError: SubmitErrorHandler<TripMemberInputs> = (errors) => {
    console.log("Add Member Errors: ", errors)
  }

  const onSubmit: SubmitHandler<TripMemberInputs> = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset className="space-y-4 disabled:opacity-90">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <SubmitButton>Save</SubmitButton>
          </DialogFooter>
        </fieldset>
      </form>
    </Form>
  )
}
