import React from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon, HomeIcon, CalculatorIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import { quickSearchItems } from "../app/_constants/search"
import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

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
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
