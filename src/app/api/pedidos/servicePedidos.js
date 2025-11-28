import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPedidos() {
  return prisma.pedido.findMany({
    include: {
      cliente: true,
      itens: {
        include: {
          produto: true,
        },
      },
    },
  });
}

export async function getPedidoById(id) {
  return prisma.pedido.findUnique({
    where: { id: Number(id) },
    include: {
      cliente: true,
      itens: {
        include: {
          produto: true, // ← necessário
        },
      },
    },
  });
}

export async function createPedido(data) {
  return prisma.pedido.create({
    data: {
      clienteId: data.clienteId,
      valorTotal: data.valorTotal,
      status: data.status ?? "pendente",

      cep: data.cep,
      rua: data.rua,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,

      itens: {
        create: data.itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario,
        })),
      },
    },
    include: {
      cliente: true,
      itens: {
        include: {
          produto: true,
        },
      },
    },
  });
}

export async function updatePedido(id, data) {
  return prisma.pedido.update({
    where: { id: Number(id) },
    data,
  });
}

export async function deletePedido(id) {
  return prisma.pedido.delete({ where: { id: Number(id) } });
}
