// app/api/trips/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);

    try {
        const trip = await db.trip.findUnique({
            where: { id },
            include: { driver: true },
        });

        if (!trip) {
            return NextResponse.json({ error: "Trip not found" }, { status: 404 });
        }

        return NextResponse.json(trip, { status: 200 });
    } catch (error) {
        console.error("Error fetching trip:", error);
        return NextResponse.json({ error: "Error fetching trip" }, { status: 500 });
    }
}
