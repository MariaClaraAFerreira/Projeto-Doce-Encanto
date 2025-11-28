"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Header from "../componentes/header";

export default function CustomLogin() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.senha);

      if (result.success) {
        router.push("/");
      } else {
        setErrors({
          ...errors,
          api:
            result.error || "Erro ao fazer login. Por favor, tente novamente.",
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Doce Encanto
          </h1>
          <p className="text-gray-600 mt-2">Bem-vindo de volta!</p>
        </div>

        {/* Card de Login */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Fazer Login
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Entre com suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Aviso de demonstração */}
            <Button
                          type="button"
                          className="w-full mb-4 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 533.5 544.3"
                            className="w-5 h-5"
                          >
                            <path
                              fill="#4285f4"
                              d="M533.5 278.4c0-17.4-1.4-34-4.1-50.2H272v95h146.9c-6.3 33.8-25 62.4-53.3 81.5v67h85.9c50.4-46.5 81-114.8 81-193.3z"
                            />
                            <path
                              fill="#34a853"
                              d="M272 544.3c71.6 0 131.6-23.7 175.5-63.6l-85.9-67c-23.9 16.1-54.5 25.5-89.6 25.5-68.9 0-127.3-46.5-148.2-109.1H35.9v68.4C79.8 480.7 169.4 544.3 272 544.3z"
                            />
                            <path
                              fill="#fbbc04"
                              d="M123.8 330.1c-10.2-30.5-10.2-63.4 0-93.9V167.8H35.9c-38.3 76.3-38.3 166.4 0 242.7l87.9-68.4z"
                            />
                            <path
                              fill="#ea4335"
                              d="M272 107.7c39 0 74 13.4 101.5 39.5l76-76C403.6 24.7 343.6 0 272 0 169.4 0 79.8 63.6 35.9 167.8l87.9 68.4C144.7 154.2 203.1 107.7 272 107.7z"
                            />
                          </svg>
                          Entrar com o Google
                        </Button>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo de E-mail */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className={`h-12 pl-10 transition-all ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Campo de Senha */}
              <div className="space-y-2">
                <Label
                  htmlFor="senha"
                  className="text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="senha"
                    type="password"
                    value={formData.senha}
                    onChange={(e) => handleInputChange("senha", e.target.value)}
                    placeholder="••••••••"
                    className={`h-12 pl-10 transition-all ${
                      errors.senha
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                    }`}
                  />
                </div>
                {errors.senha && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.senha}
                  </p>
                )}
              </div>

              {/* Link Esqueceu a senha */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                >
                  Esqueceu a senha?
                </a>
              </div>

              {/* Botão Entrar */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Entrar
                  </div>
                )}
              </Button>
            </form>

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Link para Registro */}
            <div className="text-center">
              <p className="text-gray-600">
                Não tem conta?{" "}
                <Link
                  href="/registro"
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Link para Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 text-sm hover:underline transition-colors"
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
