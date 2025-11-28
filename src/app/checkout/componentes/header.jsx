"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  ClipboardList,
  Cake,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSheet from "../../componentes/carrinhoSheet"; // ✅ importando o novo componente de carrinho

export default function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50  h-20 ">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Menu Desktop */}
        <nav className="hidden mt-0 md:flex items-center justify-between w-full h-18 bg-[#CDECF9] shadow-xl px-6 py-3 ml-6 rounded-xl">
          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo_amor1.png"
              alt="Logo Doce Encanto"
              width={60}
              height={60}
              className="rounded-4xl"
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

          {/* Navegação */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-1 text-gray-700 hover:text-pink-600 transition"
            >
              <Home className="w-4 h-4" />
              Início
            </Link>

            

            

            

          

            {/* ✅ Carrinho substituído pelo CartSheet */}
           
          </div>
        </nav>

       
      </div>

    </header>
  );
}
