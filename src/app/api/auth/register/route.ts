import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";
import bcrypt from "bcryptjs"; // Cambiado a bcryptjs

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Log de los datos entrantes
    console.log("Data recibida:", data);

    // Verificar si el email ya existe
    const userFound = await db.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      console.log("Email ya existe");
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Verificar si el username ya existe

    // Validar el rol
    if (!["DRIVER", "PASSENGER"].includes(data.role)) {
      console.log("Rol inválido:", data.role);
      return NextResponse.json(
        { message: "Invalid role. Role must be DRIVER or PASSENGER." },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log("Contraseña hasheada:", hashedPassword);

    // Crear el nuevo usuario
    const newUser = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role, // Rol del usuario
      },
    });

    // Excluir contraseña del usuario devuelto
    const { password, ...userWithoutPassword } = newUser;

    console.log("Usuario creado exitosamente:", userWithoutPassword);

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error: any) {
    console.error("Error en el servidor:", error.message);
    return NextResponse.json(
      { message: "Error en el servidor. Intenta nuevamente más tarde." },
      { status: 500 }
    );
  }
}
