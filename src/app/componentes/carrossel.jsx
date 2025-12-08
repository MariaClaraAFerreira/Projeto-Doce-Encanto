"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function Carrosel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
    })
  );

  const slides = [
    {
      src: "/bolo3.jpeg",
      title: "Bolos Personalizados",
      description: "Criamos o bolo dos seus sonhos",
    },
    {
      src: "/bolo1.jpeg",
      title: "Bolos Prontos",
      description: "Feitos com chocolate belga",
    },
    {
      src: "/cupcake1.jpeg",
      title: "Cupcakes Deliciosos",
      description: "Sabores únicos e especiais",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={[plugin.current]}
        className="w-full rounded-xl flex items-center justify-center overflow-hidden"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="relative w-full flex justify-center items-center h-48 sm:h-64 md:h-80 lg:h-96">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-xl brightness-110"
                />
                {/* Texto sobreposto no canto inferior esquerdo */}
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 left-4 sm:left-6 md:left-8 lg:left-12 text-left z-10">
                  <h2 className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2 drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navegação visível apenas no desktop */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
