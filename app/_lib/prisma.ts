import { PrismaClient } from "@prisma/client"

// Define um tipo para o global object
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Configura o PrismaClient com logs e opções para o Neon
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: "pretty",
  })

// Preserva a instância em desenvolvimento
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
