import { z } from "zod"

export const createSuggestionSchema = z.object({
  boardId: z
    .string({ required_error: "Board is required." })
    .nonempty({ message: "Board is required." }),
  title: z
    .string({ required_error: "Trip name is required." })
    .nonempty({ message: "Trip name is required." }),
  description: z.string().optional(),
  url: z
    .union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid website URL." }),
    ])
    .optional(),
})

export type CreateSuggestionInputs = z.infer<typeof createSuggestionSchema>

export const suggestionIdSchema = z.object({
  id: z
    .string({ required_error: "Suggestion ID is required." })
    .nonempty({ message: "Suggestion ID is required." }),
})

export const updateSuggestionSchema = createSuggestionSchema
  .partial()
  .merge(suggestionIdSchema)

export type UpdateSuggestionInputs = z.infer<typeof updateSuggestionSchema>

export const suggestionVoteIdSchema = z.object({
  id: z
    .string({ required_error: "Vote ID is required." })
    .nonempty({ message: "Vote ID is required." }),
})

export const createSuggestionCommentSchema = z.object({
  content: z
    .string({ required_error: "Content is required." })
    .nonempty({ message: "Content is required." }),
  suggestionId: z
    .string({ required_error: "Suggestion is required." })
    .nonempty({ message: "Suggestion is required." }),
})

export type CreateSuggestionCommentInputs = z.infer<
  typeof createSuggestionCommentSchema
>

export const suggestionCommentIdSchema = z.object({
  id: z
    .string({ required_error: "Comment ID is required." })
    .nonempty({ message: "Comment ID is required." }),
})

export const updateSuggestionCommentSchema = createSuggestionCommentSchema
  .partial()
  .merge(suggestionCommentIdSchema)

export type UpdateSuggestionCommentInputs = z.infer<
  typeof updateSuggestionCommentSchema
>
