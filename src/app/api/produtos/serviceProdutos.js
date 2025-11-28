import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getProdutos() {
  return prisma.produto.findMany();
}

export async function getProdutoById(id) {
  return prisma.produto.findUnique({ where: { id: Number(id) } });
}

export async function createProduto(data) {
  return prisma.produto.create({ data });
}

export async function updateProduto(id, data) {
  return prisma.produto.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteProduto(id) {
  return prisma.produto.delete({ where: { id: Number(id) } });
}
