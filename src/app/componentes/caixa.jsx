import React from "react";
import { Heart } from "lucide-react";

export default function Caixa() {
  return (
    <section className=" bg-cover bg-center py-28 text-center h-[400px] bg-[#f9c9d6d2]">
      <h1 className="text-6xl font-bold text-white drop-shadow-[2px_2px_10px_rgba(255,255,255,0.3)] font-[cursive]">
        Bem-vindos ao <span className="text-pink-400">Doce Encanto</span>
      </h1>
      <p className="mt-4 text-xl text-white/90 font-medium flex justify-center ">
        Doces que encantam o paladar e o coração{" "}
        <Heart className="text-pink-400 mt-1 ml-1" size={20} />
      </p>
      <button className="mt-8 bg-white text-pink-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-pink-50 transition">
        Ver Produtos
      </button>
    </section>
  );
}
