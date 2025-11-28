"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Cake,
  LogIn,
  UserPlus,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSheet from "../componentes/carrinhoSheet";
import { useAuth } from "@/app/context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cliente, logout } = useAuth();

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* DESKTOP */}
        <nav className="hidden md:flex items-center justify-between w-full bg-[#CDECF9] shadow-xl px-6 py-3 ml-6 rounded-xl">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo_amor1.png"
              alt="Logo Doce Encanto"
              width={60}
              height={60}
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-lg text-pink-600 font-[cursive]">
                Doce Encanto
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Confeitaria Artesanal
              </span>
            </div>
          </div>

          {/* LINKS */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition">
              <Home className="w-4 h-4" />
              Início
            </Link>

            <Link href="/monte-seu-bolo" className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition">
              <Cake className="w-4 h-4" />
              Monte seu Bolo
            </Link>

            {/* 🔥 SOMENTE ADMIN — Botão Pedidos */}
            {cliente?.nivel === "admin" && (
              <Link
                href="/admin/pedidos"
                className="flex items-center gap-1 text-red-600 font-semibold hover:text-red-700 transition"
              >
                <Cake className="w-4 h-4" />
                Pedidos
              </Link>
            )}

            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            {/* ==============================
                SE ESTÁ LOGADO
            =============================== */}
            {cliente ? (
              <>
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {cliente.nome.split(" ")[0]}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-300 text-pink-500 hover:bg-purple-50 hover:border-purple-400 flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4 text-pink-500" />
                    Login
                  </Button>
                </Link>

                <Link href="/registro">
                  <Button size="sm" className="bg-pink-500 text-white shadow-md flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Cadastro
                  </Button>
                </Link>
              </>
            )}

            <CartSheet />
          </div>
        </nav>

        {/* MOBILE */}
        <div className="flex items-center gap-2 md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-pink-600">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <CartSheet />
        </div>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-100">
          <nav className="flex flex-col items-center gap-3 py-4">
            <Link href="/" className="text-gray-700 hover:text-pink-600">Início</Link>
            <Link href="/monte-seu-bolo" className="text-gray-700 hover:text-pink-600">Monte seu Bolo</Link>

            {/* 🔥 MOBILE — Botão Pedidos para ADMIN */}
            {cliente?.nivel === "admin" && (
              <Link href="/admin/pedidos" className="text-red-600 font-semibold">
                Pedidos
              </Link>
            )}

            {cliente ? (
              <>
                <span className="text-gray-700">{cliente.nome}</span>

                <Button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-pink-600">Login</Link>
                <Link href="/registro" className="text-gray-700 hover:text-pink-600">Cadastro</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
