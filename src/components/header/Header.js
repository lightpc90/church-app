"use client";

import { useState, useEffect } from "react";
import styles from './FadingBackground.module.css'
import BackgroundImages from "../BackgroundImages";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const backgroundImages = BackgroundImages();
  return (
    <section>
      {/* THE HEADER CONTAINER */}
      <div className="h-[600px] md:h-[800px] lg:h-[1000px] flex justify-center items-center relative">
        <div
          className={`absolute inset-0 text-white flex flex-col p-5 md:p-10 lg:p-20 justify-between mt-[80px] bg-gradient-to-tr from-purple-900 to-pink-900 bg-cover bg-center mix-blend-darken `}
        >
          <Image
            src={`${backgroundImages[currentIndex]}`}
            alt={`header_image_${currentIndex}`}
            fill
            
            className={` bg-center mix-blend-overlay object-cover duration-[3s] ease-in-out ${styles.fadinBackground}`}
          />
          {/* WELCOME TO BEAUTIFUL GATE */}
          <div className=" flex flex-col gap-2 lg:gap-8 mix-blend-lighten ">
            <h1 className="text-2xl lg:text-4xl font-bold">
              <span className="text-[#686767]">Welcome to</span> RCCG{" "}
              <span className="text-[#ffd900]">Beautiful Gate, </span>
              <span className="text-[#686767]">Lakowe</span>
            </h1>
            <p className="lg:text-2xl font-bold text-[#686767] ">
              ...Come and watch God beautify your life
            </p>
            <Link href="/#socialMedia">
              <button className="py-2 px-3 bg-[#3b3bc9] hover:text-[#151550] hover:bg-white font-semibold w-6/12 md:w-3/12 lg:w-2/12 rounded-md">
                Connect With Us
              </button>
            </Link>
          </div>

          {/* BIBLE VERSES */}
          <div className="md:flex md:justify-end">
            <p className=" flex md:text-2xl lg:text-3xl md:w-8/12 lg:w-6/12 font-serif">
              Enter His gates with thanksgiving and His courts with praise; give
              thanks to Him and bless His name.{" "}
              <span className="font-bold text-[#ece037]">Psalm 100:4</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
