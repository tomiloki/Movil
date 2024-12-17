// src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/libs/db"; // Asegúrate de importar prisma correctamente

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // **1. Validar que las credenciales existan**
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        // **2. Buscar al usuario en la base de datos**
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            password: true,
          },
        });

        // **3. Verificar si el usuario existe**
        if (!user) {
          throw new Error("No se encontró el usuario");
        }

        // **4. Verificar que la contraseña no sea null**
        if (!user.password) {
          throw new Error("La contraseña del usuario es nula");
        }

        // **5. Comparar las contraseñas**
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Contraseña incorrecta");
        }

        // **6. Retornar el objeto del usuario sin la contraseña**
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
