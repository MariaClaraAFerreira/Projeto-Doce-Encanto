"use client";

import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";




export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className="bg-[#CDECF9]">
      <body className="h-full w-full font-sans text-gray-900 antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>

        {/* 🩷 AQUI: TOASTER GLOBAL ROSA */}

      </body>
    </html>
  );
}
