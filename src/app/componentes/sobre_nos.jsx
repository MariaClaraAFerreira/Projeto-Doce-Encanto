import React from 'react'
import { Heart,Award,User } from 'lucide-react'

export default function Sobre_nos() {
  return (
     <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Sobre Nós</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Há mais de 10 anos criando momentos doces e inesquecíveis. 
            Nossa paixão pela confeitaria nos motiva a buscar sempre a excelência em cada receita.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Missão</h3>
            <p className="text-gray-600 leading-relaxed">
              Levar alegria e sabor para cada ocasião especial, criando doces únicos 
              que conectam pessoas e criam memórias afetivas duradouras.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossos Valores</h3>
            <p className="text-gray-600 leading-relaxed">
              Qualidade excepcional, ingredientes selecionados e muito carinho em cada 
              receita. Acreditamos que cada doce conta uma história especial.
            </p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Nossa Equipe</h3>
            <p className="text-gray-600 leading-relaxed">
              Uma família apaixonada pela arte da confeitaria, sempre buscando inovar 
              e surpreender nossos clientes com sabores únicos e apresentações encantadoras.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
