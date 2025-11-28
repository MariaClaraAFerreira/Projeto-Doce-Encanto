import { NextResponse } from "next/server";
import { getPedidos, createPedido } from "./servicePedidos";

export async function GET() {
  try {
    const pedidos = await getPedidos();
    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    // validações básicas (opcional, mas recomendado)
    if (!data.clienteId)
      return NextResponse.json(
        { error: "clienteId é obrigatório" },
        { status: 400 }
      );

    if (!data.itens || data.itens.length === 0)
      return NextResponse.json(
        { error: "O pedido precisa ter ao menos 1 item" },
        { status: 400 }
      );

    const novoPedido = await createPedido(data);

    return NextResponse.json(novoPedido, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
