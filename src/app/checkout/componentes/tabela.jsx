"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { showOrderSentToast } from "./SendOrderToast";

export default function FinalizarPedido() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();

  // Pagamento
  const [formaPagamento, setFormaPagamento] = useState("pix");

  // Endereço
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  // Pedido personalizado
  const [pedidoPersonalizado, setPedidoPersonalizado] = useState(null);

  // Carregar pedido personalizado
  useEffect(() => {
    const data = localStorage.getItem("pedido-personalizado");
    if (data) setPedidoPersonalizado(JSON.parse(data));
  }, []);

  // Atualização de campos de endereço
  const updateEndereco = (campo, valor) => {
    setEndereco((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  // ----------------------------------------------------------
  // CEP + Busca automática
  // ----------------------------------------------------------
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 8);
    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    updateEndereco("cep", value);

    if (value.length === 9) buscarCEP(value);
  };

  const buscarCEP = async (cep) => {
    const cepLimpo = cep.replace(/\D/g, "");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) return alert("CEP não encontrado!");

      updateEndereco("rua", data.logradouro || "");
      updateEndereco("bairro", data.bairro || "");
      updateEndereco("cidade", data.localidade || "");
      updateEndereco("uf", data.uf || "");
    } catch {
      alert("Erro ao buscar CEP!");
    }
  };

  // ----------------------------------------------------------
  // Enviar WhatsApp automaticamente
  // ----------------------------------------------------------
  const enviarWhatsApp = (pedidoId, payload) => {
    const numero = "553584028221"; // alterar

    let msg = `📦 *NOVO PEDIDO*\n\n`;
    msg += `🧾 *ID:* ${pedidoId}\n`;
    msg += `💰 *Total:* R$ ${payload.valorTotal.toFixed(2)}\n`;
    msg += `💳 *Pagamento:* ${
      formaPagamento === "pix" ? "Pix" : "Pagar na Entrega"
    }\n\n`;

    msg += `📍 *Endereço:*\n${endereco.rua}, ${endereco.bairro}\n`;
    msg += `${endereco.cidade} - ${endereco.uf}\n`;
    msg += `CEP: ${endereco.cep}\n\n`;

    msg += `🍰 *Itens:* \n`;

    if (pedidoPersonalizado?.itens?.length >= 3) {
      msg += `• Sabor: ${pedidoPersonalizado.itens?.[0]?.produtoId}\n`;
      msg += `• Recheio: ${pedidoPersonalizado.itens?.[1]?.produtoId}\n`;
      msg += `• Cobertura: ${pedidoPersonalizado.itens?.[2]?.produtoId}\n`;
    } else {
      cart.forEach((item) => {
        msg += `• ${item.quantity}x ${item.name} — R$ ${(
          item.price * item.quantity
        ).toFixed(2)}\n`;
      });
    }

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  // ----------------------------------------------------------
  // Finalizar Pedido + backend + toast + WhatsApp
  // ----------------------------------------------------------
  const finalizarPedido = async () => {
    const { cep, rua, bairro, cidade, uf } = endereco;

    if (!cep || !rua || !bairro || !cidade || !uf)
      return alert("Preencha o endereço completo!");

    const itens =
      pedidoPersonalizado?.itens?.length > 0
        ? pedidoPersonalizado.itens
        : cart.map((item) => ({
            produtoId: item.id,
            quantidade: item.quantity,
            precoUnitario: item.price,
          }));

    if (itens.length === 0) return alert("Carrinho vazio!");

    const valorTotal = pedidoPersonalizado?.valorTotal ?? total;

    const payload = {
      clienteId: 1,
      valorTotal,
      status: "pendente",
      itens,
      ...endereco,
    };

    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error(await res.text());
        return alert("Erro ao criar pedido!");
      }

      const pedido = await res.json();

      showOrderSentToast("Seu pedido foi enviado para a confeiteira! 🎀");
      enviarWhatsApp(pedido.id, payload);

      clearCart();
      localStorage.removeItem("pedido-personalizado");

      router.push(`/pedido-confirmado?id=${pedido.id}`);
    } catch (e) {
      console.error(e);
      alert("Erro inesperado.");
    }
  };

  // ----------------------------------------------------------
  // Render: Resumo do Pedido
  // ----------------------------------------------------------
  const renderResumo = () => {
    if (pedidoPersonalizado?.itens?.length >= 3) {
      return (
        <ul className="space-y-1 mb-3">
          <li>Sabor: {pedidoPersonalizado.itens?.[0]?.produtoId}</li>
          <li>Recheio: {pedidoPersonalizado.itens?.[1]?.produtoId}</li>
          <li>Cobertura: {pedidoPersonalizado.itens?.[2]?.produtoId}</li>
        </ul>
      );
    }

    if (cart.length === 0)
      return <p className="text-gray-500">Seu carrinho está vazio.</p>;

    return (
      <ul className="space-y-1 mb-3">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    );
  };

  // ----------------------------------------------------------
  // JSX
  // ----------------------------------------------------------
  return (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="shadow-lg rounded-2xl bg-blue-50 max-w-max p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Finalizar Pedido
        </h1>

        {/* Endereço */}
        <div className="space-y-3 mb-6">
          <h2 className="font-semibold text-lg">Endereço de Entrega</h2>

          <input
            type="text"
            placeholder="CEP"
            value={endereco.cep}
            maxLength={9}
            onChange={handleCepChange}
            className="w-full border p-2 rounded-lg"
          />

          {["rua", "bairro", "cidade"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={endereco[field]}
              onChange={(e) => updateEndereco(field, e.target.value)}
              className="w-full border p-2 rounded-lg"
            />
          ))}

          <input
            type="text"
            placeholder="UF"
            maxLength={2}
            value={endereco.uf}
            onChange={(e) => updateEndereco("uf", e.target.value.toUpperCase())}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Pagamento */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-2">Forma de Pagamento</h2>
          <div className="flex gap-6">
            {[
              { label: "Pix", value: "pix" },
              { label: "Pagar na Entrega", value: "entrega" },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={formaPagamento === opt.value}
                  onChange={() => setFormaPagamento(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="border-t pt-4">
          <h2 className="font-semibold text-lg mb-2">Resumo do Pedido</h2>

          {renderResumo()}

          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span className="text-pink-600">
              R$ {(pedidoPersonalizado?.valorTotal ?? total).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={finalizarPedido}
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold transition"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
