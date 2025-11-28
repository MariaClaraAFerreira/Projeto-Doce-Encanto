import { NextResponse } from "next/server";
import { getItensPedido, createItemPedido } from "./serviceItemPedido";

export async function GET() {
  try {
    const itens = await getItensPedido();
    return NextResponse.json(itens);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const novoItem = await createItemPedido(data);
    return NextResponse.json(novoItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
