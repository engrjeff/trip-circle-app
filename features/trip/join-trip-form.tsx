"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

import { JoinTripInputs, joinTripSchema } from "./schema"

export function JoinTripForm() {
  const form = useForm<JoinTripInputs>({
    resolver: zodResolver(joinTripSchema),
    defaultValues: { inviteCode: "" },
  })

  const onError: SubmitErrorHandler<JoinTripInputs> = (errors) => {
    console.log(`Join Trip Errors: `, errors)
  }

  const onSubmit: SubmitHandler<JoinTripInputs> = (data) => {
    console.log(data)
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
        <fieldset className="space-y-4">
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
          <div className="pt-6">
            <SubmitButton className="w-full">Join Trip Circle</SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
