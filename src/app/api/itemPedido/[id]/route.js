import { NextResponse } from "next/server";
import {
  getItemPedidoById,
  updateItemPedido,
  deleteItemPedido,
} from "../serviceItemPedido";

export async function GET(_, { params }) {
  try {
    const item = await getItemPedidoById(params.id);
    if (!item)
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const atualizado = await updateItemPedido(params.id, data);
    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await deleteItemPedido(params.id);
    return NextResponse.json({ message: "Item deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
