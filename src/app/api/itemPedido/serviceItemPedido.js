import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getItensPedido() {
  return prisma.itemPedido.findMany({
    include: { pedido: true, produto: true },
  });
}

export async function getItemPedidoById(id) {
  return prisma.itemPedido.findUnique({
    where: { id: Number(id) },
    include: { pedido: true, produto: true },
  });
}

export async function createItemPedido(data) {
  return prisma.itemPedido.create({ data });
}

export async function updateItemPedido(id, data) {
  return prisma.itemPedido.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deleteItemPedido(id) {
  return prisma.itemPedido.delete({ where: { id: Number(id) } });
}
