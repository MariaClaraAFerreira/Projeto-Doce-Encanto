import React from "react";
import { Heart, Award, User } from "lucide-react";

export default function Sobre_nos() {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Sobre Nós</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Essa confeitaria foi pensada para mesclar o amor pela arte e pela
            comida. Uma homenagem aos aprendizados passados por minha avó e
            tias, passando uma tradição de família para que mais pessoas possam
            conhecer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Nossa Missão
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Adoçar a vida, para ocasiões especiais e dias simples, porque todo
              dia merece ser celebrado.
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
              Prezamos pela qualidade de nossos ingredientes, e muito amor em
              cada receita.
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
              Somos uma família que ama cozinhar. Desde nossa bisavó passando o
              amor pela comida até chegar em seus bisnetos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
