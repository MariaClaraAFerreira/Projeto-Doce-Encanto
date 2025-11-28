"use client";
import { useEffect, useState } from "react";
import ProductForm from "../componentes/ProductForm";
import ProductList from "../componentes/ProductList";
import EditModal from "../componentes/EditModal";

export default function AdminCadastro() {
  const [produtos, setProdutos] = useState([]);
  const [editingProduto, setEditingProduto] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function loadProdutos() {
    try {
      const res = await fetch("/api/produtos");
      if (!res.ok) throw new Error("Erro ao carregar produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProdutos();
  }, []);

  function openEdit(produto) {
    setEditingProduto(produto);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProduto(null);
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-700">
        Cadastro de Produtos
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 border border-pink-200">
        <ProductForm onSuccess={loadProdutos} />
      </div>

      <ProductList
        produtos={produtos}
        onRefresh={loadProdutos}
        onEdit={openEdit}
      />

      {modalOpen && (
        <EditModal
          produto={editingProduto}
          onClose={closeModal}
          onSuccess={loadProdutos}
        />
      )}
    </div>
  );
}
