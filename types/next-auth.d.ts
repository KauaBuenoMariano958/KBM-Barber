import NextAuth, { DefaultSession } from "next-auth"

// Estende os tipos do NextAuth para incluir o `id` no objeto user da sessão
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      /** O identificador do usuário, fornecido pelo adaptador Prisma */
      id: string
    } & DefaultSession["user"]
  }
}
