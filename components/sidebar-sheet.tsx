import React from "react"
import { Button } from "./ui/button"
import { HomeIcon, CalculatorIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import { quickSearchItems } from "../app/_constants/search"
import Link from "next/link"

const SidebarButton = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        <Avatar>
          <AvatarImage src="FotoKaua.jpg" />
        </Avatar>

        <div>
          <p className="font-bold">Kauã Bueno</p>
          <p className="text-xs text-muted-foreground">
            kauabuenomariano@gmail.com
          </p>
        </div>
      </div>

      <div className="boerder-solid flex flex-col gap-2 border-b py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalculatorIcon size={18} />
          Agendamento
        </Button>
      </div>

      <div className="boerder-solid flex flex-col gap-3 border-b py-5">
        {quickSearchItems.map((item) => (
          <Button
            className="gap- justify-start"
            variant="ghost"
            key={item.title}
          >
            <Image
              src={item.imageUrl}
              width={18}
              height={18}
              alt={item.title}
            />
            {item.title}
          </Button>
        ))}
      </div>

      <div className="boerder-solid flex flex-col gap-3 border-b py-5">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
