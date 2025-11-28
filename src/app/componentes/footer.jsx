import React from 'react'

export default function Footer() {
  return (
     <footer className="bg-pink-500 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-xl font-bold">Obrigada por nos visitar!</p>
          <p>
            &copy; {new Date().getFullYear()} Doce Encanto. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
  )
}
