import prisma from "../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const trips = await prisma.trip.findMany({
      where: {
        departure: {
          gte: new Date(),
        },
        capacity: {
          gt: 0,
        },
      },
      include: {
        conductor: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching available trips:", error);
    res.status(500).json({ message: "Error fetching available trips" });
  }
}
