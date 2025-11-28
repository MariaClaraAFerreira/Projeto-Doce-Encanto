"use client";

import { useParams } from "next/navigation";
import DetalhesProduto from "@/app/componentes/DetalhesProduto";

export default function PageDetalhesProduto() {
  const { id } = useParams();

  return <DetalhesProduto id={id} />;
}
