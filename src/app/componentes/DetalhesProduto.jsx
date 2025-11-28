"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetalhesProduto({ id }) {
  const router = useRouter();
  const [produto, setProduto] = useState(null);

  // Simula busca de produto (poderia vir de API)
  useEffect(() => {
    const produtos = [
      {
        id: 1,
        nome: "Bolo Red Velved",
        preco: 45.9,
        descricao: "Red Velved, naked cake, recheio de brigadeiro de cream chesse",
        imagem: "/bolo1.jpeg",
      },
      {
        id: 2,
        nome: "Torta de Limão",
        preco: 39.9,
        descricao: "Recheio com raspas de limão e base crocante.",
        imagem: "/bolo2.jpeg",
      },
      {
        id: 3,
        nome: "Bolo doce de  Leite",
        preco: 2.5,
        descricao: "Recheio de doce de leite suave com morango, cobertura de chantininho.",
        imagem: "/bolo3.jpeg",
      },

       {
        id: 4,
        nome: "Bolo doce de  Leite",
        preco: 2.5,
        descricao: "Recheio de doce de leite suave com morango, cobertura de chantininho.",
        imagem: "/bolo4.jpeg",
      },

       {
        id: 5,
        nome: "Bolo de Ninho",
        preco: 2.5,
        descricao: "Recheio de ninho com raspas de chocolate ,cobertura chatilly.",
        imagem: "/bolo5.jpeg",
      },

      {
        id: 6,
        nome: "Ovo de pascoa recheado Maracuja",
        preco: 2.5,
        descricao: "Brigadeiro com musse de maracuja ,bordas com castanha de caju.",
        imagem: "/bolo6.jpeg",
      },

      {
        id: 7,
        nome: "Ovo de pascoa Ninho",
        preco: 2.5,
        descricao: "Recheio de ninho com uva.",
        imagem: "/bolo7.jpeg",
      },


      {
        id: 12,
        nome: "Bolo de Ninho",
        preco: 2.5,
        descricao: "Recheio de ninho com uva, cobertura chantininho.",
        imagem: "/bolo12.jpeg",
      },

      {
        id: 13,
        nome: "Bolo de doce de leite com geleia",
        preco: 2.5,
        descricao: "Recheio de doce de leite suave com geleia de morango, cobertura de chantininho.",
        imagem: "/bolo13.jpeg",
      },

    ];

    const encontrado = produtos.find((p) => p.id === Number(id));
    setProduto(encontrado);
  }, [id]);

  if (!produto)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Carregando produto...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-pink-700 mb-2">
            {produto.nome}
          </h1>
          <p className="text-gray-600 mb-4">{produto.descricao}</p>
          <p className="text-pink-600 font-bold text-xl mb-6">
            R$ {produto.preco.toFixed(2)}
          </p>
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
