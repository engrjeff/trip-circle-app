"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { SubmitButton } from "@/components/ui/submit-button"
import { Textarea } from "@/components/ui/textarea"

import { createSuggestionComment } from "./actions"
import {
  CreateSuggestionCommentInputs,
  createSuggestionCommentSchema,
} from "./schema"

interface SuggestionCommentFormProps {
  suggestionId: string
  onAfterSave: VoidFunction
}

export function SuggestionCommentForm({
  onAfterSave,
  suggestionId,
}: SuggestionCommentFormProps) {
  const queryClient = useQueryClient()

  const form = useForm<CreateSuggestionCommentInputs>({
    resolver: zodResolver(createSuggestionCommentSchema),
    defaultValues: { content: "", suggestionId },
  })

  const action = useAction(createSuggestionComment, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<CreateSuggestionCommentInputs> = (
    errors
  ) => {
    console.error(errors)
  }

  const onSubmit: SubmitHandler<CreateSuggestionCommentInputs> = async (
    data
  ) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      toast.success("Comment added!")

      form.reset()

      await queryClient.invalidateQueries({ queryKey: ["trip-circle"] })

      onAfterSave()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset
          disabled={action.isPending}
          className="space-y-2 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    aria-label="comment content"
                    placeholder="Add a comment..."
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8"
              onClick={onAfterSave}
            >
              Cancel
            </Button>
            <SubmitButton loading={action.isPending} size="sm" className="h-8">
              Send
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </Form>
  )
}
