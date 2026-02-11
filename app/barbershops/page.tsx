//Page para queryparms ex: /barbershops?id=123

import React from "react"
import { db } from "../_lib/prisma"
import BarbershopItem from "@/components/barbershop-item"
import Header from "@/components/header"
import Search from "@/components/search"

interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

const BarberShopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    //Acesando o banco de dados para pegar as barbearias
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive", //Ignora maiusculas e minusculas na busca
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams?.search}&quot;
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarberShopPage
