'use client'

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade"
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};


export const CarouselPlugin: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade({})]);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, })
  );

  return (
    <Carousel
      // plugins={[plugin.current]}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
        Fade()
      ]}
      className="p-0 m-0 flex items-center justify-center h-full object-cover"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      ref={emblaRef}
    >
      <CarouselContent className="p-0 m-0 w-full h-full">
        {slides.map((item, index) => (
          <CarouselItem key={index} className="p-0 m-0 w-full h-full ">
            <div className=" h-full">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center h-full p-0">
                  <Image
                    src={item}
                    alt="carousel images"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};