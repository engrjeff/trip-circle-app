"use server"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/db"
import { authActionClient } from "@/lib/safe-action"

import {
  createSuggestionCommentSchema,
  createSuggestionSchema,
  suggestionCommentIdSchema,
  suggestionIdSchema,
  suggestionVoteIdSchema,
  updateSuggestionCommentSchema,
  updateSuggestionSchema,
} from "./schema"

// suggestions
export const createSuggestion = authActionClient
  .metadata({ actionName: "createSuggestion" })
  .schema(createSuggestionSchema)
  .action(async ({ parsedInput, ctx }) => {
    const suggestion = await prisma.suggestion.create({
      data: {
        title: parsedInput.title,
        description: parsedInput.description,
        url: parsedInput.url,
        boardId: parsedInput.boardId,
        authorId: ctx.clientId,
      },
      include: {
        board: {
          select: {
            tripCircleId: true,
          },
        },
      },
    })

    revalidatePath(`/trip/${suggestion.board.tripCircleId}`)

    return suggestion
  })

export const updateSuggestion = authActionClient
  .metadata({ actionName: "updateSuggestion" })
  .schema(updateSuggestionSchema)
  .action(async ({ parsedInput: { id, ...body } }) => {
    const suggestion = await prisma.suggestion.update({
      where: {
        id,
      },
      data: body,
    })

    return suggestion
  })

export const deleteSuggestion = authActionClient
  .metadata({ actionName: "deleteSuggestion" })
  .schema(suggestionIdSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.suggestion.delete({
      where: {
        id,
      },
    })

    return { ok: true }
  })

// suggestion votes
export const addSuggestionVote = authActionClient
  .metadata({ actionName: "addSuggestionVote" })
  .schema(suggestionIdSchema)
  .action(async ({ parsedInput: { id: suggestionId }, ctx }) => {
    const vote = await prisma.vote.create({
      data: {
        suggestionId,
        memberId: ctx.clientId,
      },
    })

    return vote
  })

export const removeSuggestionVote = authActionClient
  .metadata({ actionName: "removeSuggestionVote" })
  .schema(suggestionVoteIdSchema)
  .action(async ({ parsedInput: { id: voteId } }) => {
    await prisma.vote.delete({
      where: {
        id: voteId,
      },
    })

    return { ok: true }
  })

// suggestion comments
export const createSuggestionComment = authActionClient
  .metadata({ actionName: "createSuggestionComment" })
  .schema(createSuggestionCommentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const comment = await prisma.suggestionComment.create({
      data: {
        suggestionId: parsedInput.suggestionId,
        content: parsedInput.content,
        authorId: ctx.clientId,
      },
    })

    return comment
  })

export const updateSuggestionComment = authActionClient
  .metadata({ actionName: "updateSuggestionComment" })
  .schema(updateSuggestionCommentSchema)
  .action(async ({ parsedInput }) => {
    const comment = await prisma.suggestionComment.update({
      where: {
        id: parsedInput.id,
      },
      data: {
        content: parsedInput.content,
      },
    })

    return comment
  })

export const deleteSuggestionComment = authActionClient
  .metadata({ actionName: "deleteSuggestionComment" })
  .schema(suggestionCommentIdSchema)
  .action(async ({ parsedInput }) => {
    await prisma.suggestionComment.delete({
      where: {
        id: parsedInput.id,
      },
    })

    return { ok: true }
  })
