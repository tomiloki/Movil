// app/home_conductor/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Trip {
  id: number;
  origin: string;
  destination: string;
  departure: string;
  capacity: number;
  costPerPerson: number;
}

export default function HomeConductor() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departure: "",
    capacity: "",
    costPerPerson: "",
  });

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (session?.user?.role !== "DRIVER") {
      router.push("/");
    } else {
      fetchTrips();
    }
  }, [session, status]);

  const fetchTrips = async () => {
    try {
      const response = await fetch(
        `/api/trips?conductorId=${session?.user.id}`
      );
      if (response.ok) {
        const data: Trip[] = await response.json();
        setTrips(data);
      } else {
        console.error(
          `Error al cargar los viajes: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    }
  };

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      origin,
      destination,
      departure,
      capacity,
      costPerPerson,
    } = formData;

    if (
      !origin ||
      !destination ||
      !departure ||
      !capacity ||
      !costPerPerson
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          departure,
          capacity: parseInt(capacity),
          costPerPerson: parseFloat(costPerPerson),
        }),
      });

      if (response.ok) {
        const newTrip: Trip = await response.json();
        setTrips((prevTrips) => [...prevTrips, newTrip]);
        setIsModalOpen(false);
        setFormData({
          origin: "",
          destination: "",
          departure: "",
          capacity: "",
          costPerPerson: "",
        });
      } else {
        const errorData = await response.json();
        console.error(`Error al crear el viaje: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al crear el viaje:", error);
    }
  };

  const handleDeleteTrip = async (id: number) => {
    try {
      const response = await fetch(`/api/trips/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip.id !== id)
        );
      } else {
        const errorData = await response.json();
        console.error(
          `Error al eliminar el viaje: ${errorData.message}`
        );
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
        <h1 className="text-xl font-bold">
          Hola, {session?.user?.username}
        </h1>
      </header>
      <main className="p-6">
        <button
          onClick={() => setIsModalOpen(true)}
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
                    <p>Origen: {trip.origin}</p>
                    <p>Destino: {trip.destination}</p>
                    <p>
                      Fecha y Hora de Salida:{" "}
                      {new Date(trip.departure).toLocaleString()}
                    </p>
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

      {/* Modal para crear viaje */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Crear nuevo viaje
            </h2>
            <form onSubmit={handleCreateTrip}>
              {/* Campo para 'origin' */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Origen:
                </label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) =>
                    setFormData({ ...formData, origin: e.target.value })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>
              {/* Campo para 'destination' */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Destino:
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      destination: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>
              {/* Campo para 'departure' */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Fecha y Hora de Salida:
                </label>
                <input
                  type="datetime-local"
                  value={formData.departure}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departure: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>
              {/* Campo para 'capacity' */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Capacidad:
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>
              {/* Campo para 'costPerPerson' */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Costo por persona:
                </label>
                <input
                  type="number"
                  value={formData.costPerPerson}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      costPerPerson: e.target.value,
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-600 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
