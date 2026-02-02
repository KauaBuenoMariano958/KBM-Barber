//Impede que ocorra multiplas instancias do Banco de Dados em ambiente de desenvolvimento

import { PrismaClient } from "@prisma/client"

let cachedPrisma: PrismaClient | undefined;

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!cachedPrisma) {
    cachedPrisma = new PrismaClient()
  }
  prisma = cachedPrisma
}

export const db = prisma