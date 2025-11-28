"use client";
import { useState, useEffect } from "react";

export default function EditModal({ produto, onClose, onUpdated }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagemUrl: "",
  });

  useEffect(() => {
    if (produto) {
      setForm({
        nome: produto.nome,
        descricao: produto.descricao || "",
        preco: produto.preco,
        imagemUrl: produto.imagemUrl || "",
      });
    }
  }, [produto]);

  if (!produto) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      const res = await fetch(`/api/produtos/${produto.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          preco: parseFloat(form.preco),
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar produto");

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Falha ao atualizar produto.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl border space-y-4">
        <h2 className="text-xl font-semibold">Editar Produto</h2>

        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nome"
        />

        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Descrição"
        />

        <input
          type="number"
          step="0.01"
          name="preco"
          value={form.preco}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Preço"
        />

        <input
          type="text"
          name="imagemUrl"
          value={form.imagemUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="URL da imagem"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 rounded"
          >
            Salvar
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
