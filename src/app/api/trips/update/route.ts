// app/api/trips/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";

export async function PUT(req: NextRequest) {
    const { id, destination, capacity, costPerPerson } = await req.json();

    try {
        const updatedTrip = await db.trip.update({
            where: { id },
            data: { destination, capacity, costPerPerson },
        });

        return NextResponse.json(updatedTrip, { status: 200 });
    } catch (error) {
        console.error("Error updating trip:", error);
        return NextResponse.json({ error: "Error updating trip" }, { status: 500 });
    }
}
