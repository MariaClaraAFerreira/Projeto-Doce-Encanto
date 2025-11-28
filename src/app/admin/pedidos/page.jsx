"use client";

import { useEffect, useState } from "react";
import Header from "@/app/componentes/header";
import Footer from "@/app/componentes/footer";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [buscaCliente, setBuscaCliente] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [novoStatus, setNovoStatus] = useState("");

  async function loadPedidos() {
    try {
      const res = await fetch("/api/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  }

  useEffect(() => {
    loadPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const matchStatus =
      filtroStatus === "todos" || pedido.status === filtroStatus;

    const matchCliente =
      !buscaCliente ||
      pedido.cliente.nome
        .toLowerCase()
        .includes(buscaCliente.toLowerCase());

    return matchStatus && matchCliente;
  });

  function abrirModal(pedido) {
    setPedidoSelecionado(pedido);
    setNovoStatus(pedido.status);
    setModalOpen(true);
  }

  function fecharModal() {
    setModalOpen(false);
    setPedidoSelecionado(null);
  }

  async function salvarStatus() {
    if (!pedidoSelecionado) return;

    try {
      const res = await fetch(`/api/pedidos/${pedidoSelecionado.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
      });

      if (!res.ok) {
        alert("Erro ao atualizar status");
        return;
      }

      await loadPedidos();
      fecharModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-[#CDECF9]">
      <Header />
      


      <div className="p-6 max-w-6xl h-[600px] mx-auto mt-28">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Gestão de Pedidos
        </h1>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar por cliente..."
            className="border border-gray-300 p-3 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={buscaCliente}
            onChange={(e) => setBuscaCliente(e.target.value)}
          />

          <select
            className="border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="pago">Pago</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 font-medium">ID</th>
                <th className="p-3 font-medium">Cliente</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr
                  key={pedido.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{pedido.id}</td>
                  <td className="p-3">{pedido.cliente.nome}</td>
                  <td className="p-3 capitalize font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        pedido.status === "pago"
                          ? "bg-green-100 text-green-700"
                          : pedido.status === "pendente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pedido.status}
                    </span>
                  </td>
                  <td className="p-3 font-medium">
                    R$ {pedido.valorTotal.toFixed(2)}
                  </td>

                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                      onClick={() => abrirModal(pedido)}
                    >
                      Detalhes
                    </button>

                    <button
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-sm"
                      onClick={() => abrirModal(pedido)}
                    >
                      Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && pedidoSelecionado && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl animate-fadeIn">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Pedido #{pedidoSelecionado.id}
              </h2>

              <p className="text-gray-700 mb-2">
                Cliente:{" "}
                <strong>{pedidoSelecionado.cliente.nome}</strong>
              </p>

              <p className="text-gray-700 mb-4">
                Total:{" "}
                <strong>
                  R$ {pedidoSelecionado.valorTotal.toFixed(2)}
                </strong>
              </p>

              <h3 className="font-semibold mb-2">Itens:</h3>
              <ul className="mb-4 list-disc ml-6 text-gray-700">
                {pedidoSelecionado.itens.map((item) => (
                  <li key={item.id}>
                    Produto #{item.produtoId} — {item.quantidade} un
                  </li>
                ))}
              </ul>

              <label className="block mb-2 font-medium">
                Alterar status:
              </label>
              <select
                className="border p-3 rounded-lg w-full mb-4 shadow-sm"
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="cancelado">Cancelado</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                  onClick={fecharModal}
                >
                  Fechar
                </button>

                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                  onClick={salvarStatus}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      

      <Footer className="flex justify-center items-end" />
    </div>
  );
}
