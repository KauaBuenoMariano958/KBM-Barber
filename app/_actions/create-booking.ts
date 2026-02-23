"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

export async function createBooking(params: {
  serviceId: string
  userId: string
  barbershopId: string
  date: Date
}) {
  console.log("🔵 SERVER ACTION - createBooking recebeu:", params)

  try {
    const booking = await db.booking.create({
      data: {
        userId: params.userId,
        serviceId: params.serviceId,
        barbershopId: params.barbershopId,
        date: params.date,
      },
    })

    console.log("✅ SERVER ACTION - Booking criado:", booking)
    revalidatePath("/bookings")
    return booking
  } catch (error) {
    console.error("❌ SERVER ACTION - Erro:", error)
    throw error
  }
}