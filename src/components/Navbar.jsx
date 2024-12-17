"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Actualiza la sesión cuando se detectan cambios
    update();
  }, []);

  if (status === "loading") {
    return null; // Mostrar nada mientras se carga la sesión
  }

  return (
    <nav className="flex justify-between bg-gray-950 text-white px-24 items-center py-3">
      <h1 className="text-xl font-bold">Mi Aplicación</h1>
      <ul className="flex gap-x-4 items-center">
        {!session?.user ? (
          // Usuario no autenticado
          <>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link href="/auth/register">Registrarse</Link>
            </li>
            <li>
              <Link href="/mapa">Mapa</Link>
            </li>
          </>
        ) : (
          // Usuario autenticado
          <>
            {session.user.role === "DRIVER" ? (
              // Enlaces para conductores
              <>
                <li>
                  <Link href="/home_conductor">Inicio Conductor</Link>
                </li>
                <li>
                  <Link href="/driver/profile">Mi Perfil</Link>
                </li>
                <li>
                  <Link href="/driver/trips">Mis Viajes</Link>
                </li>
                <li>
                  <Link href="/mapa">Mapa</Link>
                </li>
              </>
            ) : (
              // Enlaces para pasajeros
              <>
                <li>
                  <Link href="/home_pasajero">Inicio Pasajero</Link>
                </li>
                <li>
                  <Link href="/passenger/profile">Mi Perfil</Link>
                </li>
                <li>
                  <Link href="/passenger/bookings">Mis Reservas</Link>
                </li>
                <li>
                  <Link href="/mapa">Mapa</Link>
                </li>
              </>
            )}
            <li>
              <button
                onClick={() => signOut()}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
