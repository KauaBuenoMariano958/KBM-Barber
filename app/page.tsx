import React from "react"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

const Home = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Kauã</h2>
        <p>Segunda-feira, 05 de agosto. </p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
