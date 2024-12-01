import prisma from "../../../libs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (session.user.role !== "DRIVER") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const { origin, destination, departure, capacity, costPerPerson } = req.body;

  try {
    const newTrip = await prisma.trip.create({
      data: {
        origin,
        destination,
        departure: new Date(departure),
        capacity: parseInt(capacity),
        costPerPerson: parseFloat(costPerPerson),
        conductor: {
          connect: { id: session.user.id },
        },
      },
    });

    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip" });
  }
}
