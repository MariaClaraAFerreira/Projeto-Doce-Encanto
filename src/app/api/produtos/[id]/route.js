import { NextResponse } from "next/server";
import {
  getProdutoById,
  updateProduto,
  deleteProduto,
} from "../serviceProdutos";

export async function GET(_, { params }) {
  try {
    const produto = await getProdutoById(params.id);
    if (!produto)
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const atualizado = await updateProduto(params.id, data);
    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    await deleteProduto(params.id);
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
