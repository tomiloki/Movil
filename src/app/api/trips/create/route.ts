// app/api/trips/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";

export async function POST(req: NextRequest) {
    const { destination, capacity, costPerPerson, driverId } = await req.json();

    try {
        const newTrip = await db.trip.create({
            data: {
                destination,
                capacity,
                costPerPerson,
                driver: { connect: { id: driverId } },
            },
        });
        return NextResponse.json(newTrip, { status: 201 });
    } catch (error) {
        console.error("Error creating trip:", error);
        return NextResponse.json({ error: "Error creating trip" }, { status: 500 });
    }
}
