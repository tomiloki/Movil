import prisma from "../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { conductorId } = req.query;

  try {
    const trips = await prisma.trip.findMany({
      where: { conductorId: parseInt(conductorId) },
      include: {
        passengers: {
          include: {
            user: true, // Incluye datos de los pasajeros
          },
        },
      },
    });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Error fetching trips" });
  }
}