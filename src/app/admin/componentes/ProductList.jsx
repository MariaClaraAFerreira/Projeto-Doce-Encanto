"use client";
import Image from "next/image";

export default function ProductList({ produtos, onRefresh, onEdit }) {
  async function handleDelete(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir produto");

      onRefresh(); // atualiza a lista
    } catch (error) {
      console.error(error);
      alert("Falha ao excluir produto.");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="bg-white p-4 shadow rounded-xl border flex flex-col"
        >
          {produto.imagemUrl ? (
            <img
              src={produto.imagemUrl}
              alt={produto.nome}
              className="w-full h-40 object-cover rounded"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 grid place-items-center rounded text-gray-600">
              sem imagem
            </div>
          )}

          <h3 className="text-lg font-semibold mt-3">{produto.nome}</h3>
          <p className="text-sm text-gray-600">{produto.descricao}</p>

          <p className="text-purple-600 font-bold mt-2">
            R$ {produto.preco.toFixed(2)}
          </p>

          <div className="mt-4 flex justify-between gap-2">
            <button
              onClick={() => onEdit(produto)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(produto.id)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
