import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
      return NextResponse.json({ cliente: null }, { status: 200 });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(session.value) },
      select: {
        id: true,
        nome: true,
        email: true,
        nivel: true, 
      },
    });

    return NextResponse.json({ cliente }, { status: 200 });
  } catch (error) {
    console.error("Erro no /me:", error);
    return NextResponse.json(
      { message: "Erro interno" },
      { status: 500 }
    );
  }
}
