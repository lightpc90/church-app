"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import bg from "../../../public/Ch1.jpg"

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image, { StaticImageData } from "next/image";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
};

export const HomeHeaderCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
  const plugin = React.useRef(
    Autoplay({ delay: 8000, stopOnInteraction: true })
  );

  return (
    <Carousel
      // plugins={[plugin.current]}
      plugins={[
        Autoplay({
          delay: 8000,
        }),
        Fade({ duration: 5000 } as EmblaOptionsType),
      ]}
      className="p-0 m-0 flex items-center w-full justify-center bg-white overflow-hidden"
      style={{ height: "90vh" }}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      ref={emblaRef}
    >
      <CarouselContent className="p-0 m-0 w-full h-full">
        {slides.map((item, index) => (
          <CarouselItem key={index} className="p-0 m-0 w-full h-full ">
            <div className=" h-full w-full bg-green-700">
              <div className="relative w-full flex items-center justify-center h-[500px] bg-blue-800 overflow-hidden ">
                <div className="absolute w-[130%] flex items-center justify-center inset-0 bg-rose-800">
                  <Image
                    src={item}
                    alt="Sliding Image"
                    width={500}
                    height={500}
                    loading="eager"
                    className="w-full h-full object-cover object-center animate-slide bg-yellow-600"
                  />
                </div>
              </div>
              {/* <Card className="w-[100vw] h-full relative overflow-hidden bg-blue-800">
                <CardContent
                  className="absolute inset-0 flex items-center justify-center h-full p-0
                  w-[130%] bg-rose-800
                "
                >
                  <Image
                    src={item}
                    alt="carousel images"
                    width={800}
                    height={800}
                    loading="eager"
                    className="object-cover w-full h-[100vh] object-center animate-slide"
                  />
                </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
