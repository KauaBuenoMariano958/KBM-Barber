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

const Home = async () => {
  try {
    // Tenta buscar os dados
    const barbershops = await db.barbershop.findMany({})
    const popularBarbershops = await db.barbershop.findMany({
      orderBy: {
        name: "desc",
      },
    })

    return (
      <div>
        <Header />
        <div className="p-5">
          <h2 className="text-xl font-bold">Olá, Kauã</h2>
          <p>Segunda-feira, 05 de agosto. </p>

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

          {/* AGENDAMENTO */}
          <BookingItem />

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
