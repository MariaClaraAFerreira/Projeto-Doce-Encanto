"use client";
import { useState } from "react";

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imagemUrl: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const preco = parseFloat(form.preco);

    if (isNaN(preco)) {
      alert("Preço inválido!");
      return;
    }

    try {
      const res = await fetch("/api/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, preco }),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar produto");
      }

      setForm({ nome: "", descricao: "", preco: "", imagemUrl: "" });
      onCreated();
    } catch (error) {
      console.error(error);
      alert("Falha ao cadastrar produto.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md space-y-3 border"
    >
      <h2 className="text-xl font-semibold">Cadastrar Produto</h2>

      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        step="0.01"
        name="preco"
        placeholder="Preço"
        value={form.preco}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="imagemUrl"
        placeholder="URL da imagem"
        value={form.imagemUrl}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded">
        Salvar
      </button>
    </form>
  );
}
