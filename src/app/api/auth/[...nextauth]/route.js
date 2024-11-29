import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";

 export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password", placeholder: "******" }
            },
            async authorize(credentials, req) {
                console.log(credentials);

                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if(!userFound) throw new Error('User not found')
                console.log(userFound)

                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if (!matchPassword) throw new Error('Wrong password')

                return {
                    id: userFound.id,
                    name: userFound.username,
                    email: userFound.email,
                }
            }
        }),
        
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

    ],
    pages: {
        signIn: "/auth/login",
    },

    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'google') {
                // Busca usuario existente
                const existingUser = await db.user.findUnique({
                    where: { email: profile.email }
                });

                // Si el usuario no existe, créalo en la base de datos
                if (!existingUser) {
                    await db.user.create({
                        data: {
                            email: profile.email,
                            username: profile.email.split('@')[0], // Deriva el username del email
                            image: profile.picture,
                        }
                    });
                }
            }
            return true;
        },

        async session({ session, token, user }) {
            if (token) {
              session.user.id = token.sub;
              session.user.role = token.role; // Agregar rol a la sesión
            }
            return session;
          },
          
          async jwt({ token, user }) {
            if (user) {
              token.role = user.role; // Agregar rol al token
            }
            return token;
          },

        async redirect({ url, baseUrl }) {
            return baseUrl + "/home_conductor";
        }
    },
};


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}