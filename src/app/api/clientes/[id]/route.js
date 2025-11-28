import { NextResponse } from "next/server";
import {
  getClienteById,
  updateCliente,
  deleteCliente,
} from "../serviceCliente";

export async function GET(_, { params }) {
  try {
    const cliente = await getClienteById(params.id);
    if (!cliente)
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const atualizado = await updateCliente(params.id, data);
    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await deleteCliente(params.id);
    return NextResponse.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
