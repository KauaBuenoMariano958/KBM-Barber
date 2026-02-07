import React from "react"
import { Button } from "./ui/button"
import { HomeIcon, CalculatorIcon, LogOutIcon, LogInIcon } from "lucide-react"
import Image from "next/image"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet"
import { quickSearchItems } from "../app/_constants/search"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog"

const SidebarButton = () => {
  return (
    <SheetContent className="overflow-y-auto">
      {" "}
      {/* O conteudo do sidebar */}
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center gap-3 border-b border-solid py-5">
        <h2 className="font-bold">Olá, faça seu login</h2>
        <Dialog>
          {" "}
          {/* Faz o botão de login aparecer */}
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <LogInIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            {" "}
            {/* Conteúdo do login */}
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>
            <Button variant="outline" className="gap-2 font-bold">
              <Image
                src="/google.svg"
                width={18}
                height={18}
                alt="Fazer login com o Google"
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage src="/FotoKaua.jpg" />
        </Avatar>

        <div>
          <p className="font-bold">Kauã Bueno</p>
          <p className="text-xs text-muted-foreground">
            kauabuenomariano@gmail.com
          </p>
        </div> */}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
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
      <div className="flex flex-col gap-3 border-b border-solid py-5">
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
      <div className="flex flex-col gap-3 border-b border-solid py-5">
        <Button variant="ghost" className="justify-start gap-2">
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
