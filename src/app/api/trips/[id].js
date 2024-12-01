import prisma from "../../../libs/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const tripId = parseInt(id);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
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

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ message: "Error fetching trip" });
  }
}
