// app/page.tsx
import React from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import RetryButton from "@/components/retry-button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import { quickSearchItems } from "./_constants/search"
import BookingItem from "@/components/booking-item"
import Search from "@/components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { ptBR } from "date-fns/locale"
import { format } from "date-fns"

const Home = async () => {
  try {
    // Tenta buscar os dados
    const session = await getServerSession(authOptions)
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
      orderBy: {
        name: "desc",
      },
    })
    const confirmedBookings = session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session?.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: {
              include: {
                barbershop: true,
              },
            },
          },
          orderBy: {
            date: "asc",
          },
        })
      : []

    return (
      <div>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">
            Olá, {session?.user ? session.user.name : "bem vindo"}!
          </h2>
          <p>
            {(() => {
              const formattedDate = format(new Date(), "EEEE, dd 'de' MMMM", {
                locale: ptBR,
              })
              return (
                formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
              )
            })()}
          </p>

          {/* BUSCA */}
          <div className="mt-6">
            <Search />
          </div>

          {/* BUSCA RÁPIDA */}
          <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {quickSearchItems.map((item) => (
              <Button
                className="gap-2"
                variant="secondary"
                key={item.title}
                asChild
              >
                <Link
                  href={`/barbershops?service=${encodeURIComponent(item.title)}`}
                >
                  <Image
                    src={item.imageUrl}
                    width={16}
                    height={16}
                    alt={item.title}
                  />
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>

          {/* IMAGEM */}
          <div className="relative mt-6 h-[150px] w-full">
            <Image
              src="/banner-01.png"
              fill
              className="rounded-xl object-cover"
              alt="Agende nos melhores com FSW Barber"
            />
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          {/* AGENDAMENTO */}
          <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar barbearias:", error)

    // Fallback - mostra mensagem de erro
    return (
      <div>
        <Header />
        <div className="p-5 text-center">
          <h2 className="text-xl font-bold text-red-500">Erro de conexão</h2>
          <p className="mt-2">
            Não foi possível carregar as barbearias. O banco de dados pode estar
            temporariamente indisponível.
          </p>
          <RetryButton>Tentar novamente</RetryButton>
        </div>
      </div>
    )
  }
}

export default Home
