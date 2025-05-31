"use server"

import { TripCircle } from "@prisma/client"
import { AxiosError } from "axios"

import { apiClient } from "@/lib/api-client"
import prisma from "@/lib/db"

export async function getTripById(id: string) {
  const trip = await prisma.tripCircle.findUnique({
    where: { id },
    include: {
      members: true,
      boards: { include: { suggestions: { include: { author: true } } } },
    },
  })

  return trip
}

export async function getTripByCode(inviteCode: string) {
  try {
    const response = await apiClient.get<TripCircle>("/join", {
      params: { code: inviteCode },
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
