import prisma from "../../../libs/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { destination, capacity, costPerPerson, conductorId } = req.body;

  try {
    const newTrip = await prisma.trip.create({
      data: {
        destination,
        capacity: parseInt(capacity),
        costPerPerson: parseFloat(costPerPerson),
        conductor: {
          connect: { id: parseInt(conductorId) },
        },
      },
    });

    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ message: "Error creating trip" });
  }
}
