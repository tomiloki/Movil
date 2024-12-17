// app/api/trips/route.ts

import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const conductorId = searchParams.get("conductorId");

    console.log("Conductor ID:", conductorId);

    if (conductorId) {
      console.log("Fetching trips for conductor:", conductorId);
      const trips = await prisma.trip.findMany({
        where: { conductorId: parseInt(conductorId) },
        include: {
          passengers: {
            include: {
              user: true,
            },
          },
        },
      });

      console.log("Trips fetched for conductor:", trips);
      return NextResponse.json(trips);
    } else {
      // Si no se proporciona conductorId, devuelve todos los viajes disponibles para los pasajeros
      console.log("Fetching all available trips");
      const trips = await prisma.trip.findMany({
        where: {
          capacity: {
            gt: 0, // Opcionalmente, solo viajes con capacidad disponible
          },
        },
        include: {
          conductor: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          departure: "asc",
        },
      });

      console.log("Available trips fetched:", trips);
      // Agregamos el 'return' que faltaba aquí
      return NextResponse.json(trips);
    }
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { message: "Error fetching trips" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session) {
      console.error("No session found");
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    if (session.user.role !== "DRIVER") {
      console.error("User is not a DRIVER");
      return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error("Error parsing JSON body:", error);
      return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
    }

    const { origin, destination, departure, capacity, costPerPerson } = body;

    if (
      !origin ||
      !destination ||
      !departure ||
      !capacity ||
      !costPerPerson
    ) {
      console.error("Missing fields in request body");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newTrip = await prisma.trip.create({
      data: {
        origin,
        destination,
        departure: new Date(departure),
        capacity: parseInt(capacity),
        costPerPerson: parseFloat(costPerPerson),
        conductorId: parseInt(session.user.id),
      },
    });

    console.log("New trip created:", newTrip);
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { message: "Error creating trip" },
      { status: 500 }
    );
  }
}
