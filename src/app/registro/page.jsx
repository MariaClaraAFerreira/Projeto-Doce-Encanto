"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  Lock,
  User,
  UserPlus,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function CustomRegister() {
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    senha: "",
    confirmar_senha: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome_completo.trim()) {
      newErrors.nome_completo = "Nome completo é obrigatório";
    } else if (formData.nome_completo.trim().length < 3) {
      newErrors.nome_completo = "Nome deve ter no mínimo 3 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter no mínimo 6 caracteres";
    }

    if (!formData.confirmar_senha) {
      newErrors.confirmar_senha = "Confirmação de senha é obrigatória";
    } else if (formData.senha !== formData.confirmar_senha) {
      newErrors.confirmar_senha = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await register(
        formData.nome_completo,
        formData.email,
        formData.senha
      );

      if (result.success) {
        router.push("/login");
      } else {
        setErrors({
          ...errors,
          api:
            result.error || "Erro ao criar conta. Por favor, tente novamente.",
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        api: "Erro ao conectar com o servidor. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.senha;
    if (!password) return null;

    if (password.length < 6)
      return { text: "Fraca", color: "text-red-500", width: "w-1/3" };
    if (password.length < 10)
      return { text: "Média", color: "text-yellow-500", width: "w-2/3" };
    return { text: "Forte", color: "text-green-500", width: "w-full" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-pink-100 via-purple-100 to-indigo-100">
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Doce Encanto
          </h1>
          <p className="text-gray-600 mt-2">Crie sua conta e comece agora!</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Criar Conta
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Preencha os dados abaixo para se cadastrar
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* AVISO SUPER VISÍVEL */}
            <div className="w-full mb-4 p-4 rounded-lg border-2 border-red-400 bg-red-50 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-red-200 opacity-20 animate-pulse blur-xl"></div>

              <div className="relative flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 animate-bounce" />

                <div>
                  <p className="text-red-700 font-semibold text-sm">
                    ⚠ Atenção: Não utilize seu e-mail pessoal real.
                  </p>
                  <p className="text-red-600 text-xs mt-1">
                    O sistema ainda está em desenvolvimento e a proteção dos
                    dados (LGPD) não está finalizada.
                  </p>
                  <p className="text-red-700 font-bold text-sm mt-1">
                    ➝ Exemplo seguro:{" "}
                    <span className="underline">JoaoBatista@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NOME */}
              <div className="space-y-2">
                <Label htmlFor="nome_completo">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="nome_completo"
                    type="text"
                    value={formData.nome_completo}
                    onChange={(e) =>
                      handleInputChange("nome_completo", e.target.value)
                    }
                    placeholder="João da Silva"
                    className={`h-12 pl-10 ${
                      errors.nome_completo
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-purple-400"
                    }`}
                  />
                </div>
                {errors.nome_completo && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nome_completo}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="exemplo@gmail.com"
                    className={`h-12 pl-10 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-purple-400"
                    }`}
                  />
                </div>
              </div>

              {/* SENHA */}
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    className={`h-12 pl-10 ${
                      errors.senha
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-300 focus:ring-purple-400"
                    }`}
                  />
                </div>

                {/* Indicador de força */}
                {passwordStrength && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Força da senha:</span>
                      <span className={`font-medium ${passwordStrength.color}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color.replace(
                          "text-",
                          "bg-"
                        )} transition-all duration-300 ${
                          passwordStrength.width
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CONFIRMAR SENHA */}
              <div className="space-y-2">
                <Label htmlFor="confirmar_senha">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmar_senha"
                    type="password"
                    value={formData.confirmar_senha}
                    onChange={(e) =>
                      handleInputChange("confirmar_senha", e.target.value)
                    }
                    className={`h-12 pl-10 ${
                      errors.confirmar_senha
                        ? "border-red-400 focus:ring-red-400"
                        : formData.confirmar_senha &&
                          formData.senha === formData.confirmar_senha
                        ? "border-green-400 focus:ring-green-400"
                        : "border-gray-300 focus:ring-purple-400"
                    }`}
                  />

                  {formData.confirmar_senha &&
                    formData.senha === formData.confirmar_senha && (
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-xl text-white font-semibold transition-all"
              >
                {isLoading ? "Criando conta..." : "Registrar"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600">
                Já tem conta?{" "}
                <Link href="/login" className="text-purple-600 underline">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 underline">
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
