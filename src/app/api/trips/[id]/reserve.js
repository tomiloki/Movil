// pages/api/trips/[id]/reserve.js

import prisma from "../../../../libs/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import sendEmail from "../../../../libs/sendEmail";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (session.user.role !== "PASSENGER") {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    const tripId = parseInt(id);

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        conductor: true,
      },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.capacity <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    // Verificar si el pasajero ya está en el viaje
    const existingReservation = await prisma.tripOnPassenger.findFirst({
      where: {
        tripId: tripId,
        userId: session.user.id,
      },
    });

    if (existingReservation) {
      return res.status(400).json({ message: "You have already reserved this trip" });
    }

    // Realizar la reserva dentro de una transacción
    await prisma.$transaction([
      // Reducir la capacidad en 1
      prisma.trip.update({
        where: { id: tripId },
        data: {
          capacity: trip.capacity - 1,
        },
      }),
      // Crear la reserva
      prisma.tripOnPassenger.create({
        data: {
          tripId: tripId,
          userId: session.user.id,
        },
      }),
    ]);

    // Enviar confirmaciones por correo electrónico
    try {
      const passengerEmail = session.user.email;
      const driverEmail = trip.conductor.email;

      const emailSubject = "Confirmación de Reserva de Viaje";
      const emailBodyPassenger = `
      Estimado/a ${session.user.username},

      Has reservado el viaje desde ${trip.origin} hasta ${trip.destination} el ${new Date(trip.departure).toLocaleString()}.

      Conductor: ${trip.conductor.username}
      Precio: $${trip.costPerPerson.toFixed(2)}

      Gracias por utilizar nuestra aplicación.

      Saludos,
      TeLlevoAPP
      `;

      const emailBodyDriver = `
      Estimado/a ${trip.conductor.username},

      El usuario ${session.user.username} ha reservado un asiento en tu viaje desde ${trip.origin} hasta ${trip.destination} el ${new Date(trip.departure).toLocaleString()}.

      Por favor, ponte en contacto con el pasajero si es necesario.

      Gracias por utilizar nuestra aplicación.

      Saludos,
      TeLlevoAPP
      `;

      // Enviar correo al pasajero
      await sendEmail(passengerEmail, emailSubject, emailBodyPassenger);

      // Enviar correo al conductor
      await sendEmail(driverEmail, emailSubject, emailBodyDriver);
    } catch (emailError) {
      console.error("Error sending confirmation emails:", emailError);
      // Puedes decidir si quieres que este error afecte la respuesta o simplemente registrarlo
    }

    res.status(200).json({ message: "Reservation successful" });
  } catch (error) {
    console.error("Error reserving trip:", error);
    res.status(500).json({ message: "Error reserving trip" });
  }
}
