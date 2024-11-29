"use client"
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

type Trip = {
  id: number;
  destination: string;
  capacity: number;
  costPerPerson: number;
};

export default function HomeConductor() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [trips, setTrips] = useState<Trip[]>([]);
  
    // Redirigir si no está autenticado o no es DRIVER
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/login");
      }
  
      if (session?.user?.role !== "DRIVER") {
        router.push("/");
      } else {
        fetchTrips(session.user.id); // Cargar viajes del conductor
      }
    }, [session, status]);
  
    const fetchTrips = async (conductorId: string) => {
      try {
        const response = await fetch(`/api/trips?conductorId=${conductorId}`);
        const data: Trip[] = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error al cargar los viajes:", error);
      }
    };
  
    const handleCreateTrip = async () => {
      const destination = prompt("Ingrese el destino:");
      const capacity = prompt("Ingrese la capacidad:");
      const costPerPerson = prompt("Ingrese el costo por persona:");
  
      if (!destination || !capacity || !costPerPerson) {
        alert("Todos los campos son obligatorios.");
        return;
      }
  
      try {
        const response = await fetch("/api/trips/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destination,
            capacity: parseInt(capacity),
            costPerPerson: parseFloat(costPerPerson),
            conductorId: session?.user.id,
          }),
        });
  
        if (response.ok) {
          const newTrip: Trip = await response.json();
          setTrips((prevTrips) => [...prevTrips, newTrip]);
        } else {
          console.error("Error al crear el viaje.");
        }
      } catch (error) {
        console.error("Error al crear el viaje:", error);
      }
    };
  
    const handleDeleteTrip = async (id: number) => {
      try {
        const response = await fetch(`/api/trips/${id}`, { method: "DELETE" });
        if (response.ok) {
          setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
        } else {
          console.error("Error al eliminar el viaje.");
        }
      } catch (error) {
        console.error("Error al eliminar el viaje:", error);
      }
    };
  
    if (status === "loading") {
      return <div>Cargando...</div>;
    }
  
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Hola, {session?.user?.name} (Conductor)</h1>
          <button
            onClick={() => router.push("/api/auth/signout")}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </header>
        <main className="p-6">
          <button
            onClick={handleCreateTrip}
            className="bg-blue-500 px-4 py-2 rounded mb-4"
          >
            Crear nuevo viaje
          </button>
          <div>
            <h2 className="text-lg font-semibold mb-2">Tus viajes:</h2>
            {trips.length > 0 ? (
              <ul>
                {trips.map((trip) => (
                  <li
                    key={trip.id}
                    className="bg-gray-800 p-4 rounded mb-2 flex justify-between"
                  >
                    <div>
                      <p>Destino: {trip.destination}</p>
                      <p>Capacidad: {trip.capacity}</p>
                      <p>Costo por persona: ${trip.costPerPerson}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="bg-red-500 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No has creado ningún viaje aún.</p>
            )}
          </div>
        </main>
      </div>
    );
  }