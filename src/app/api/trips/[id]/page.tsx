// app/home_pasajero/trips/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

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

function TripDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tripId = params?.id;

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
    const fetchTrip = async () => {
      try {
        const res = await fetch(`/api/trips/${tripId}`);
        if (res.ok) {
          const data = await res.json();
          setTrip(data);
        } else {
          console.error("Error fetching trip");
        }
      } catch (error) {
        console.error("Error fetching trip:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && tripId) {
      fetchTrip();
    }
  }, [status, tripId]);

  const handleReserve = async () => {
    try {
      const res = await fetch(`/api/trips/${tripId}/reserve`, {
        method: "POST",
      });
      if (res.ok) {
        alert(
          "Reserva realizada con éxito. Se ha enviado una confirmación por correo electrónico."
        );
        router.push("/home_pasajero");
      } else {
        const data = await res.json();
        alert(`Error al realizar la reserva: ${data.message}`);
      }
    } catch (error) {
      console.error("Error reservando el viaje:", error);
      alert("Error al realizar la reserva.");
    }
  };

  if (status === "loading" || isLoading) {
    return <div>Cargando...</div>;
  }

  if (!trip) {
    return <div>Viaje no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-bgDark text-textLight p-4">
      <h1 className="text-3xl font-bold text-primaryBlue mb-8 text-center">
        Detalle del Viaje
      </h1>
      <div className="bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-semibold">
          {trip.origin} ➔ {trip.destination}
        </h2>
        <p>
          Fecha y hora de salida:{" "}
          {new Date(trip.departure).toLocaleString()}
        </p>
        <p>Precio por persona: ${trip.costPerPerson.toFixed(2)}</p>
        <p>Asientos disponibles: {trip.capacity}</p>
        <p>Conductor: {trip.conductor.username}</p>
        <button
          onClick={handleReserve}
          className="mt-4 bg-primaryBlue text-white px-6 py-3 rounded"
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
}

export default TripDetailPage;
