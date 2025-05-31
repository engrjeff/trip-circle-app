"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

import { addTripMember } from "./actions"
import { TripMemberInputs, tripMemberSchema } from "./schema"

export function TripMemberForm({ tripCircleId }: { tripCircleId: string }) {
  const form = useForm<TripMemberInputs>({
    resolver: zodResolver(tripMemberSchema),
    defaultValues: { username: "", tripCircleId },
  })

  const action = useAction(addTripMember, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<TripMemberInputs> = (errors) => {
    console.log(`Add Trip Member Errors: `, errors)
  }

  const onSubmit: SubmitHandler<TripMemberInputs> = async (data) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      toast.success(`Welcome to the trip, ${result.data.username}!`)
      form.reset()

      window.location.replace("/board")
    }
  }

  const usernameValue = form.watch("username")

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold">Join a Trip Circle</h2>
          <p className="text-muted-foreground">Enter your username</p>
        </div>
        <fieldset className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. johndoe" autoFocus {...field} />
                </FormControl>
                {usernameValue ? (
                  <FormDescription>
                    This will appear as @{usernameValue}
                  </FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton className="w-full">Join Trip Circle</SubmitButton>
        </fieldset>
      </form>
    </Form>
  )
}
