import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Heart, Award, User } from "lucide-react";

export default function Hero() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 transition-all duration-500 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative group">
              <Link href="/">
                <div className="relative from-pink-400 to-rose-500 rounded-2xl p-2 sm:p-4 shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Image
                      src="/logo_amor1.png"
                      alt="Logo"
                      width={50}
                      height={50}
                      className="w-10 sm:w-14 h-10 sm:h-14 p-1 rounded-full"
                    />
                    <span className="text-white font-bold text-lg sm:text-2xl tracking-wide drop-shadow-lg hidden sm:inline">
                      Doce Encanto
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full px-2 py-2 shadow-lg">
              <Link
                href="/"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-all duration-200 font-medium text-sm lg:text-base"
              >
                Início
              </Link>
              <Link
                href="/"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-all duration-200 font-medium text-sm lg:text-base"
              >
                Sobre
              </Link>
              <Link
                href="/"
                className="px-4 lg:px-6 py-2 rounded-full text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-all duration-200 font-medium text-sm lg:text-base"
              >
                Produtos
              </Link>
              <Link
                href="/monte-seu-bolo"
                className="px-4 lg:px-6 py-2 rounded-full  from-blue-300 to-blue-200 text-white hover:from-blue-100 hover:to-blue-200 transition-all duration-200 font-medium shadow-lg text-sm lg:text-base"
              >
                Monte seu Bolo
              </Link>
              <Link
                href="/"
                className="px-4 lg:px-6 py-2 rounded-full  from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium shadow-lg text-sm lg:text-base"
              >
                Contato
              </Link>
            </nav>

            {/* Mobile Menu Icon */}
            <div className="md:hidden"></div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="pt-20 sm:pt-32">
        {/* Hero Banner */}
        <section className="relative h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl mx-4 sm:mx-6 md:mx-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(226,115,141,1) 20%, rgba(249,201,215,1) 50%,rgba(249,201,215,1) 100%),  url('https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&h=600&fit=crop')",
            }}
          />
          <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
              Bem-vindos ao Doce Encanto
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 drop-shadow-md leading-relaxed">
              Deliciosos doces artesanais feitos com amor e ingredientes
              especiais
            </p>
            <button className="bg-white text-pink-600 hover:bg-pink-50 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 rounded-3xl transition-all hover:scale-105">
              Ver Produtos
            </button>
          </div>
        </section>

        {/* Sobre Nós */}
        <section className="py-12 sm:py-20  from-[#CDECF9] to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
                Sobre Nós
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Há mais de 10 anos criando momentos doces e inesquecíveis. Nossa
                paixão pela confeitaria nos motiva a buscar sempre a excelência
                em cada receita.
              </p>
            </div>

            {/* ERR0 corrigido — faltava '>' no grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Nossa Missão
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Levar alegria e sabor para cada ocasião especial, criando
                  doces únicos que conectam pessoas e criam memórias afetivas
                  duradouras.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Nossos Valores
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Qualidade excepcional, ingredientes selecionados e muito
                  carinho em cada receita. Acreditamos que cada doce conta uma
                  história especial.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Nossa Equipe
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Uma família apaixonada pela arte da confeitaria, sempre
                  buscando inovar e surpreender nossos clientes com sabores
                  únicos e apresentações encantadoras.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-pink-500 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-xl font-bold">Obrigada por nos visitar!</p>
          <p>
            &copy; {new Date().getFullYear()} Doce Encanto. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
