'use client'

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function MonthlyProgramsCarousel(props) {
   const { slides, options } = props;
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, duration: 30 })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-sm"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex items-center justify-center p-0 ">
                 <Image src={slide} width={800} height={800}  alt="slide" className="w-full" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
