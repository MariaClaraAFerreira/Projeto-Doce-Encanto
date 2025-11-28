import { NextResponse } from "next/server";
import { getPedidoById, updatePedido, deletePedido } from "../servicePedidos";

export async function GET(_, { params }) {
  try {
    const pedido = await getPedidoById(params.id);
    if (!pedido)
      return NextResponse.json(
        { error: "Pedido não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(pedido);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const atualizado = await updatePedido(params.id, data);
    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await deletePedido(params.id);
    return NextResponse.json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
