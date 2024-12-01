// app/api/trips/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession({ req: request, ...authOptions });

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (session.user.role !== "DRIVER") {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  const tripId = parseInt(params.id);

  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    if (trip.conductorId !== parseInt(session.user.id)) {
      return NextResponse.json(
        { message: "Not authorized to delete this trip" },
        { status: 403 }
      );
    }

    await prisma.trip.delete({
      where: { id: tripId },
    });

    return NextResponse.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return NextResponse.json(
      { message: "Error deleting trip" },
      { status: 500 }
    );
  }
}
