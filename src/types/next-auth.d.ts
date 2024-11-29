import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "DRIVER" | "PASSENGER"; // Extender el tipo
    };
  }

  interface User {
    id: string;
    role: "DRIVER" | "PASSENGER";
  }
}
