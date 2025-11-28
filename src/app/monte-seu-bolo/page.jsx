"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const [sabores, setSabores] = useState([]);
  const [recheios, setRecheios] = useState([]);
  const [coberturas, setCoberturas] = useState([]);

  const [formData, setFormData] = useState({
    sabor: "",
    recheio: "",
    cobertura: "",
    intolerante_lactose: false,
  });

  const [precoFinal, setPrecoFinal] = useState(0);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const res = await fetch("/api/produtos");
      const data = await res.json();

      setSabores(data.filter((p) => p.categoria === "sabor"));
      setRecheios(data.filter((p) => p.categoria === "recheio"));
      setCoberturas(data.filter((p) => p.categoria === "cobertura"));
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const handleInput = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setPrecoFinal(0); // zera sempre que muda algo
  };

  const calcularPreco = () => {
    if (!formData.sabor || !formData.recheio || !formData.cobertura) {
      alert("Escolha sabor, recheio e cobertura!");
      return;
    }

    const s = sabores.find((p) => p.id === formData.sabor);
    const r = recheios.find((p) => p.id === formData.recheio);
    const c = coberturas.find((p) => p.id === formData.cobertura);

    let total = s.preco + r.preco + c.preco;

    if (formData.intolerante_lactose) {
      total *= 1.25;
    }

    setPrecoFinal(total);
  };

  const finalizarPedido = () => {
    if (precoFinal === 0) {
      alert("Calcule o preço antes de finalizar!");
      return;
    }

    const pedido = {
      clienteId: 1,
      valorTotal: precoFinal,
      itens: [
        { produtoId: formData.sabor, quantidade: 1 },
        { produtoId: formData.recheio, quantidade: 1 },
        { produtoId: formData.cobertura, quantidade: 1 },
      ],
      intolerante_lactose: formData.intolerante_lactose,
    };

    localStorage.setItem("pedido-personalizado", JSON.stringify(pedido));

    router.push("/checkout");
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cake className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Monte seu Bolo
            </h1>
            <p className="text-gray-600">
              Personalize cada detalhe do seu pedido 🎂
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
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
                    {sabores.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
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
                    {recheios.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
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
                    {coberturas.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nome} — R$ {c.preco.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

              {/* CALCULAR */}
              <Button
                onClick={calcularPreco}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
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

              {/* FINALIZAR */}
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
