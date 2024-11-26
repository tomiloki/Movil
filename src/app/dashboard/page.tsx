// src/app/dashboard/page.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useState, FormEvent } from "react";
import { Trip } from "@/types/types"; // Asegúrate de que este tipo esté definido en types.ts

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}

function DashboardContent() {
    const { data: session } = useSession();
    const [trip, setTrip] = useState<Omit<Trip, "id" | "createdAt" | "updatedAt" | "driverId">>({
        destination: "",
        capacity: 0,
        costPerPerson: 0,
    });

    const createTrip = async (e: FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) {
            console.error("No user session found");
            return;
        }

        try {
            const res = await fetch("/api/trips/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...trip,
                    driverId: session.user.id,
                }),
            });
            if (res.ok) {
                const newTrip = await res.json();
                console.log("Trip created:", newTrip);
            } else {
                console.error("Error creating trip");
            }
        } catch (error) {
            console.error("Error creating trip:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <form onSubmit={createTrip} className="space-y-4">
                <input
                    type="text"
                    placeholder="Destino"
                    value={trip.destination}
                    onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Capacidad"
                    value={trip.capacity}
                    onChange={(e) => setTrip({ ...trip, capacity: +e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Costo por persona"
                    value={trip.costPerPerson}
                    onChange={(e) => setTrip({ ...trip, costPerPerson: +e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="w-full bg-primaryBlue text-white p-3 rounded-lg">
                    Crear Viaje
                </button>
            </form>
        </div>
    );
}
