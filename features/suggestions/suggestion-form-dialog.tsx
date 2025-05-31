"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Board } from "@prisma/client"
import { DialogClose } from "@radix-ui/react-dialog"
import { useQueryClient } from "@tanstack/react-query"
import { PlusIcon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"

import { createSuggestion } from "./actions"
import { CreateSuggestionInputs, createSuggestionSchema } from "./schema"

export function SuggestionFormDialog({
  board,
  small,
}: {
  board: Board
  small?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {small ? (
          <Button
            aria-label="Add Suggestion"
            variant="secondary"
            size="iconSm"
            className="transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
          >
            <PlusIcon />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start transition-opacity lg:opacity-0 lg:group-hover:opacity-100"
          >
            <PlusIcon /> Add Suggestion
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{board.title}</DialogTitle>
          <DialogDescription>{board.description}</DialogDescription>
        </DialogHeader>
        <SuggestionForm boardId={board.id} onAfterSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function SuggestionForm({
  boardId,
  onAfterSave,
}: {
  boardId: string
  onAfterSave: () => void
}) {
  const queryClient = useQueryClient()

  const form = useForm<CreateSuggestionInputs>({
    resolver: zodResolver(createSuggestionSchema),
    defaultValues: {
      boardId,
      title: "",
      description: "",
      url: "",
    },
  })

  const action = useAction(createSuggestion, {
    onError: ({ error }) => {
      if (error.serverError) {
        toast.error(error.serverError)
        return
      }
    },
  })

  const onError: SubmitErrorHandler<CreateSuggestionInputs> = (errors) => {
    console.error(errors)
  }

  const onSubmit: SubmitHandler<CreateSuggestionInputs> = async (data) => {
    const result = await action.executeAsync(data)

    if (result?.data?.id) {
      toast.success("Suggestion added!")

      await queryClient.invalidateQueries({ queryKey: ["trip-circle"] })

      form.reset()
      onAfterSave()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <fieldset
          disabled={action.isPending}
          className="space-y-4 disabled:opacity-90"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
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
                <FormLabel>
                  Description{" "}
                  <span className="text-muted-foreground italic">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your suggestion here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  URL{" "}
                  <span className="text-muted-foreground italic">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    inputMode="url"
                    placeholder="Paste a link to your suggestion here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton loading={action.isPending}>Add to Board</SubmitButton>
          </DialogFooter>
        </fieldset>
      </form>
    </Form>
  )
}
