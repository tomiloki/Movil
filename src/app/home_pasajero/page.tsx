// app/home_pasajero/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Trip {
  id: number;
  origin: string;
  destination: string;
  departure: string;
  capacity: number;
  costPerPerson: number;
  conductor: {
    id: number;
    username: string;
    email: string;
  };
}

function HomePasajero() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    } else if (
      status === "authenticated" &&
      session?.user.role !== "PASSENGER"
    ) {
      router.replace("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("/api/trips/available");
        if (res.ok) {
          const data = await res.json();
          setTrips(data);
        } else {
          console.error("Error fetching trips");
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    if (status === "authenticated") {
      fetchTrips();
    }
  }, [status]);

  if (status === "loading" || !session) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-bgDark text-textLight p-4">
      <h1 className="text-3xl font-bold text-primaryBlue mb-8 text-center">
        Bienvenido, {session.user.name}
      </h1>
      <h2 className="text-2xl mb-4">Viajes Disponibles:</h2>
      {trips.length === 0 ? (
        <p>No hay viajes disponibles en este momento.</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li key={trip.id} className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold">
                {trip.origin} ➔ {trip.destination}
              </h3>
              <p>
                Fecha y hora de salida:{" "}
                {new Date(trip.departure).toLocaleString()}
              </p>
              <p>Precio por persona: ${trip.costPerPerson.toFixed(2)}</p>
              <p>Asientos disponibles: {trip.capacity}</p>
              <p>Conductor: {trip.conductor.username}</p>
              <Link href={`/home_pasajero/trips/${trip.id}`}>
                <button className="mt-2 bg-primaryBlue text-white px-4 py-2 rounded">
                  Reservar Viaje
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePasajero;

