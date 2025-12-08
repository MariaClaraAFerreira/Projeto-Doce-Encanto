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
    <div className="w-full mx-auto max-w-7xl">
      <Carousel
        opts={{ align: "center", loop: true }}
        plugins={[plugin.current]}
        className="w-full rounded-xl overflow-hidden"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="relative w-full h-[45vh] sm:h-[60vh] md:h-[70vh] rounded-xl">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  className="object-cover rounded-xl"
                />

                {/* Texto sobreposto */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-left drop-shadow-lg">
                  <h2 className="text-white text-3xl md:text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-gray-200 text-sm md:text-lg mt-2">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navegação */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
