import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getClientes() {
  return await prisma.cliente.findMany();
}

export async function createCliente(data) {
  if (!data.nome || !data.email || !data.senha) {
    throw new Error("nome, email e senha são obrigatórios");
  }

  return await prisma.cliente.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone || null,
      endereco: data.endereco || null,
    },
  });
}

export async function getClienteById(id) {
  return await prisma.cliente.findUnique({
    where: { id: Number(id) },
  });
}

export async function updateCliente(id, data) {
  return await prisma.cliente.update({
    where: { id: Number(id) },
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha, // Inclui senha também
      telefone: data.telefone || null,
      endereco: data.endereco || null,
    },
  });
}

export async function deleteCliente(id) {
  return await prisma.cliente.delete({
    where: { id: Number(id) },
  });
}
