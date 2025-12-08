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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  UserPlus,
  AlertCircle,
  CheckCircle,
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

    if (!validateForm()) {
      return;
    }

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

  // Indicador visual da força da senha
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
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Doce Encanto
          </h1>
          <p className="text-gray-600 mt-2">Crie sua conta e comece agora!</p>
        </div>

        {/* Card de Registro */}
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
            {/* Autenticação com o Google */}
            {/* <Button
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
            </Button> */}
            <div className="w-full mb-4 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm">
              {" "}
              <p>
                Não use seu email pessoal. Pode usar seu nome exemplo:
                JoãoBatista@gmail.com
              </p>
            </div>
            <p>
              Pois ainda estamos em desenvolvimento para proteger seus dados de
              acordo com a LGPD.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo de Nome Completo */}
              <div className="space-y-2">
                <Label
                  htmlFor="nome_completo"
                  className="text-sm font-medium text-gray-700"
                >
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="nome_completo"
                    type="text"
                    value={formData.nome_completo}
                    onChange={(e) =>
                      handleInputChange("nome_completo", e.target.value)
                    }
                    placeholder="João da Silva"
                    className={`h-12 pl-10 transition-all ${
                      errors.nome_completo
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
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
                {/* Indicador de força da senha */}
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
                {errors.senha && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.senha}
                  </p>
                )}
                {!errors.senha && (
                  <p className="text-xs text-gray-500">
                    Mínimo de 6 caracteres
                  </p>
                )}
              </div>

              {/* Campo de Confirmação de Senha */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmar_senha"
                  className="text-sm font-medium text-gray-700"
                >
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmar_senha"
                    type="password"
                    value={formData.confirmar_senha}
                    onChange={(e) =>
                      handleInputChange("confirmar_senha", e.target.value)
                    }
                    placeholder="••••••••"
                    className={`h-12 pl-10 transition-all ${
                      errors.confirmar_senha
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : formData.confirmar_senha &&
                          formData.senha === formData.confirmar_senha
                        ? "border-green-400 focus:border-green-500 focus:ring-green-400"
                        : "border-gray-300 focus:border-purple-400 focus:ring-purple-400"
                    }`}
                  />
                  {formData.confirmar_senha &&
                    formData.senha === formData.confirmar_senha &&
                    !errors.confirmar_senha && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                </div>
                {errors.confirmar_senha && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.confirmar_senha}
                  </p>
                )}
              </div>

              {/* Botão Registrar */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Criando conta...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Registrar
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

            {/* Link para Login */}
            <div className="text-center">
              <p className="text-gray-600">
                Já tem conta?{" "}
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
                >
                  Faça login
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
