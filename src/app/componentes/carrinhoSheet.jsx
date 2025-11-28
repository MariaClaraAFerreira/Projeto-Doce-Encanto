"use client";

import { useCart } from "@/app/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function SimpleCartSheet() {
  const { cart, total, removeFromCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Carrinho ({cart.length})
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[90vw] sm:w-[400px] p-4">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-pink-600" />
            Meu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    R$ {item.price} x {item.quantity}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="font-bold">R$ {item.price * item.quantity}</p>

                  <button
                    className="text-red-500 text-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    remover
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="flex justify-between mt-4 font-bold">
              <span>Total:</span>
              <span>R$ {total}</span>
            </div>
          )}
        </div>

        <SheetFooter>
          <Link
            href="/checkout"
            className={`w-full mt-4 px-4 py-2 text-center rounded text-white bg-pink-500 hover:bg-pink-600 transition-colors ${
              cart.length === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Finalizar Pedido
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
