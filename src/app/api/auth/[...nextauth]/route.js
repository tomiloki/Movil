import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import db from "@/libs/db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            username: true,
            email: true,
            role: true, // Asegúrate de incluir el campo `role`
            password: true,
          },
        });

        if (!user) throw new Error("No user found");

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) throw new Error("Incorrect password");

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          role: user.role, // Incluye el rol en la sesión
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Agrega el rol al token JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role; // Agrega el rol al objeto de sesión
      }
      return session;
    },
    // Elimina el callback `redirect` o ajusta su implementación
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
  pages: {
    signIn: "/auth/login",
  },
};

// Exporta el handler para cumplir con App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
