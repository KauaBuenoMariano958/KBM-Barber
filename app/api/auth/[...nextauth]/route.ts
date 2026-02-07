import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";   
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    // ...add more providers here
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
});

export { handler as GET, handler as POST };