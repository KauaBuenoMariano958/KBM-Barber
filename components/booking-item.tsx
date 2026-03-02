import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { isFuture } from "date-fns"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BookingItemProps {
  booking?: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: Receber agendamento via props
const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking?.date)
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          {/*Esquerda*/}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit rounded-full bg-indigo-700 text-white"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3 className="font-semibold">
              {booking?.service?.name ?? "Sem serviço"}
            </h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking?.service.barbershop.imageUrl} />
              </Avatar>
              <p className="text-sm">{booking?.service.barbershop.name}</p>
            </div>
          </div>

          {/*Direita*/}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm capitalize">
              {format(booking?.date, "MMMM", { locale: ptBR })}
            </p>
            <p className="text-2xl">
              {format(booking?.date, "dd", { locale: ptBR })}
            </p>
            <p className="text-sm font-semibold">
              {format(booking?.date, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
