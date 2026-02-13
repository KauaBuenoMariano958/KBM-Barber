import React from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { Sheet, SheetTrigger } from "./ui/sheet"
import Link from "next/link"

import SidebarButton from "./sidebar-sheet"

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Link href="/">
            <Image alt="FSW Barber" src="/logo.png" height={18} width={120} />
          </Link>

          <Sheet>
            {" "}
            {/* Responsavel por fazer o sidebar abrir */}
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarButton />
          </Sheet>
        </CardContent>
      </Card>
    </div>
  )
}

export default Header
