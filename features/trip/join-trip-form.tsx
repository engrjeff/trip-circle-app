"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

import { joinTrip } from "./actions"
import { JoinTripInputs, joinTripSchema } from "./schema"

export function JoinTripForm({ inviteCode }: { inviteCode?: string }) {
  const form = useForm<JoinTripInputs>({
    resolver: zodResolver(joinTripSchema),
    defaultValues: { inviteCode: inviteCode ?? "" },
  })

  const action = useAction(joinTrip, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<JoinTripInputs> = (errors) => {
    console.log(`Join Trip Errors: `, errors)
  }

  const onSubmit: SubmitHandler<JoinTripInputs> = async (data) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      toast.success(`Welcome to the Trip Circle: ${result.data.title}`)
      // force reload
      window.location.reload()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold">Join a Trip Circle</h2>
          <p className="text-muted-foreground">
            Enter the 6-character code to join your friends
          </p>
        </div>
        <fieldset
          disabled={action.isPending}
          className="space-y-4 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="inviteCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    aria-label="Trip invite code"
                    placeholder="e.g. ABC123"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton loading={action.isPending} className="w-full">
            Continue
          </SubmitButton>
        </fieldset>
      </form>
    </Form>
  )
}
