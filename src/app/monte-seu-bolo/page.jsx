"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cake, Calculator, Heart, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Header from "../componentes/header";

export default function MonteSeuBolo() {
  const router = useRouter();

  // listas estáticas
  const saboresEst = [
    { id: 1, nome: "Baunilha", preco: 20 },
    { id: 2, nome: "Chocolate", preco: 22 },
    { id: 3, nome: "Red Velvet", preco: 25 },
  ];

  const recheiosEst = [
    { id: 1, nome: "Doce de leite", preco: 10 },
    { id: 2, nome: "Doce de leite suave com geleia de morango", preco: 12 },
    { id: 3, nome: "Ninho com uva", preco: 12 },
    { id: 4, nome: "Chantininho", preco: 11 },
    { id: 5, nome: "Ninho com banana caramelizada", preco: 13 },
    { id: 6, nome: "Brigadeiro de cream cheese", preco: 14 },
    { id: 7, nome: "Brigadeiro", preco: 10 },
    { id: 8, nome: "Prestígio", preco: 13 },
    { id: 9, nome: "Ganache de maracujá", preco: 15 },
  ];

  const coberturasEst = [
    { id: 1, nome: "Chantilly", preco: 5 },
    { id: 2, nome: "Chantininho", preco: 6 },
    { id: 3, nome: "Glacê", preco: 5 },
    { id: 4, nome: "Ganache de chocolate", preco: 8 },
  ];

  const [formData, setFormData] = useState({
    sabor: "",
    recheio: "",
    cobertura: "",
    intolerante_lactose: false,
    decoracao: "",
  });

  const [precoFinal, setPrecoFinal] = useState(0);

  const handleInput = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setPrecoFinal(0);
  };

  const calcularPreco = () => {
    if (!formData.sabor || !formData.recheio || !formData.cobertura) {
      alert("Escolha sabor, recheio e cobertura!");
      return;
    }

    const s = saboresEst.find((p) => p.id === Number(formData.sabor));
    const r = recheiosEst.find((p) => p.id === Number(formData.recheio));
    const c = coberturasEst.find((p) => p.id === Number(formData.cobertura));

    if (!s || !r || !c) {
      alert("Erro ao encontrar os produtos selecionados.");
      return;
    }

    let total = s.preco + r.preco + c.preco;

    if (formData.intolerante_lactose) total *= 1.25;

    setPrecoFinal(total);
  };

  const enviarWhatsApp = (pedido) => {
    const numero = "553584028221"; // número da confeiteira
    let msg = `📦 *NOVO PEDIDO*\n\n`;
    msg += `💰 *Total:* R$ ${pedido.valorTotal.toFixed(2)}\n`;
    msg += `🍰 *Itens:* \n`;
    msg += `• Sabor: ${
      saboresEst.find((s) => s.id === Number(formData.sabor))?.nome
    }\n`;
    msg += `• Recheio: ${
      recheiosEst.find((r) => r.id === Number(formData.recheio))?.nome
    }\n`;
    msg += `• Cobertura: ${
      coberturasEst.find((c) => c.id === Number(formData.cobertura))?.nome
    }\n`;
    if (formData.decoracao) msg += `• Decoração: ${formData.decoracao}\n`;
    if (formData.intolerante_lactose) msg += "• Sem lactose\n";

    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  const finalizarPedido = () => {
    if (precoFinal === 0) {
      alert("Calcule o preço antes de finalizar!");
      return;
    }

    const pedido = {
      valorTotal: precoFinal,
      itens: [
        { produtoId: Number(formData.sabor), quantidade: 1 },
        { produtoId: Number(formData.recheio), quantidade: 1 },
        { produtoId: Number(formData.cobertura), quantidade: 1 },
      ],
      intolerante_lactose: formData.intolerante_lactose,
      decoracao: formData.decoracao,
    };

    localStorage.setItem("pedido-personalizado", JSON.stringify(pedido));

    enviarWhatsApp(pedido);
    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cake className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Monte seu Bolo
            </h1>
            <p className="text-gray-600">
              Personalize cada detalhe do seu pedido 🎂
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 border-b border-purple-100">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Cake className="w-5 h-5 text-purple-600" />
                Personalize seu Bolo
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* SABOR */}
              <div>
                <Label>Sabor</Label>
                <Select
                  value={formData.sabor}
                  onValueChange={(v) => handleInput("sabor", v)}
                >
                  <SelectTrigger className="h-12 border-purple-200">
                    <SelectValue placeholder="Selecione um sabor" />
                  </SelectTrigger>
                  <SelectContent>
                    {saboresEst.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.nome} — R$ {s.preco.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* RECHEIO */}
              <div>
                <Label>Recheio</Label>
                <Select
                  value={formData.recheio}
                  onValueChange={(v) => handleInput("recheio", v)}
                >
                  <SelectTrigger className="h-12 border-purple-200">
                    <SelectValue placeholder="Selecione o recheio" />
                  </SelectTrigger>
                  <SelectContent>
                    {recheiosEst.map((r) => (
                      <SelectItem key={r.id} value={String(r.id)}>
                        {r.nome} — R$ {r.preco.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* COBERTURA */}
              <div>
                <Label>Cobertura</Label>
                <Select
                  value={formData.cobertura}
                  onValueChange={(v) => handleInput("cobertura", v)}
                >
                  <SelectTrigger className="h-12 border-purple-200">
                    <SelectValue placeholder="Selecione a cobertura" />
                  </SelectTrigger>
                  <SelectContent>
                    {coberturasEst.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.nome} — R$ {c.preco.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* DECORAÇÃO */}
              <div>
                <Label>Descreva a decoração desejada</Label>
                <input
                  type="text"
                  value={formData.decoracao}
                  onChange={(e) => handleInput("decoracao", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Ex.: Flores de açúcar, chocolate, etc."
                />
              </div>

              {/* SEM LACTOSE */}
              <div className="flex items-center justify-between p-4 rounded-lg border bg-yellow-50">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-orange-500" />
                  <div>
                    <Label>Intolerante à lactose</Label>
                    <p className="text-xs text-gray-500">+ 25% no valor</p>
                  </div>
                </div>
                <Switch
                  checked={formData.intolerante_lactose}
                  onCheckedChange={(v) => handleInput("intolerante_lactose", v)}
                />
              </div>

              {/* BOTÃO DE CALCULAR */}
              <Button
                onClick={calcularPreco}
                className="w-full h-12 bg-linear-to-r from-purple-500 to-pink-500 text-white"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Preço
              </Button>

              {/* PREÇO FINAL */}
              {precoFinal > 0 && (
                <div className="p-6 rounded-xl border bg-green-50 text-center">
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto" />
                  <p className="text-lg font-semibold text-gray-700">
                    Preço Final
                  </p>
                  <p className="text-3xl font-bold text-green-700">
                    R$ {precoFinal.toFixed(2)}
                  </p>

                  {formData.intolerante_lactose && (
                    <Badge className="mt-2 bg-yellow-200 text-yellow-800">
                      <Heart className="w-3 h-3 mr-1" />
                      Sem Lactose (+25%)
                    </Badge>
                  )}
                </div>
              )}

              {/* BOTÃO FINALIZAR */}
              {precoFinal > 0 && (
                <Button
                  onClick={finalizarPedido}
                  className="w-full h-12 bg-purple-600 text-white font-bold"
                >
                  Finalizar Pedido
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
