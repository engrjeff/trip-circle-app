"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { DialogFooter } from "@/components/ui/dialog"
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

export function AddTripMemberForm({ tripCircleId }: { tripCircleId: string }) {
  const form = useForm<TripMemberInputs>({
    resolver: zodResolver(tripMemberSchema),
    defaultValues: {
      username: "",
      tripCircleId: tripCircleId,
    },
  })

  const usernameValue = form.watch("username")

  const action = useAction(addTripMember, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<TripMemberInputs> = (errors) => {
    console.log("Add Member Errors: ", errors)
  }

  const onSubmit: SubmitHandler<TripMemberInputs> = async (data) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      form.reset()

      toast.success(`Welcome ${result.data.username}!`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold">
            Lokks like you already created a Trip
          </h2>
          <p className="text-muted-foreground">
            Enter your name first to continue.
          </p>
        </div>
        <fieldset
          disabled={action.isPending}
          className="space-y-4 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your username"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will appear on your Trip Circle board
                  {usernameValue ? (
                    <span className="font-semibold">{` as @${form.watch("username")}`}</span>
                  ) : null}
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <SubmitButton loading={action.isPending} className="w-full">
              Save
            </SubmitButton>
          </DialogFooter>
        </fieldset>
      </form>
    </Form>
  )
}
