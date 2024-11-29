import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; // Importa el tipo de Next.js
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  // Si no hay token, redirige al login
  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Verifica el rol para la ruta protegida
  if (url.pathname.startsWith("/home_conductor") && token.role !== "DRIVER") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home_conductor"], // Protege esta ruta
};
