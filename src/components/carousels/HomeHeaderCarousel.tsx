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
          <CarouselItem key={index} className="p-0 m-0 w-[100%] h-full ">
            <div className=" h-full w-[100%] ">
              <Card className="w-[100vw] h-full relative overflow-hidden">
                <CardContent
                  className=" flex items-center justify-center h-full p-0
                  w-[130%]"
                >
                  <Image
                    src={item}
                    alt="carousel images"
                    width={800}
                    height={800}
                    loading="eager"
                    className="object-cover w-full h-[100vh] object-center animate-slide"
                    style={{
                      filter:
                        "saturation(250%) hue-rotate(60deg)",
                    }}
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
