import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Iniciando seed...");

  // Verifica se já existe um admin
  const adminExiste = await prisma.cliente.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (adminExiste) {
    console.log("✔ Admin já existe, nenhum usuário criado.");
    return;
  }

  // Criptografa a senha
  const senhaHash = await bcrypt.hash("pablinny123", 10);

  // Cria usuário admin
  await prisma.cliente.create({
    data: {
      nome: "Administrador",
      email: "admin@admin.com",
      senha: senhaHash,
      nivel: "admin",
      telefone: "00000000000",
      endereco: "Painel Administrativo",
    },
  });

  console.log("🎉 Admin criado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });