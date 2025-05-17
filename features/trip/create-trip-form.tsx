"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import { createTrip } from "./actions"
import { CreateTripInputs, createTripSchema } from "./schema"

export function CreateTripForm() {
  const form = useForm<CreateTripInputs>({
    resolver: zodResolver(createTripSchema),
    mode: "onChange",
    defaultValues: { title: "", description: "", startDate: "", endDate: "" },
  })

  const [shouldSetDateLater, setShouldSetDateLater] = useState(true)

  const action = useAction(createTrip, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<CreateTripInputs> = (errors) => {
    console.log(`Create Trip Errors: `, errors)
  }

  const onSubmit: SubmitHandler<CreateTripInputs> = async (data) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      toast.success(`Your trip ${result.data.title} was created!`)

      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        <div>
          <h2 className="text-lg font-semibold">Create a Trip Circle</h2>
          <p className="text-muted-foreground">
            Start planning your next adventure with your circle.
          </p>
        </div>

        <fieldset
          disabled={action.isPending}
          className="space-y-4 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Trip name (e.g. Summer in Siargao)"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe your trip</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Trip description (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center">
            <div className="space-y-0.5">
              <p className="font-semibold">Trip schedule</p>
              <p className="text-muted-foreground text-sm">
                Set dates now or decide later with your group
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Switch
                name="shouldSetDateLater"
                checked={shouldSetDateLater}
                onCheckedChange={setShouldSetDateLater}
              />
              <Label htmlFor="shouldSetDateLater">Decide later</Label>
            </div>
          </div>

          {shouldSetDateLater ? null : (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="pt-6">
            <SubmitButton loading={action.isPending} className="w-full">
              Create Trip Circle
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
