'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "digging-deep.png",
  "Faith-clinic.png",
  "augPix/IMG_1618.JPG",
  "augPix/IMG_1666.JPG",
  "augPix/IMG_1642.JPG",
];

const positions = ["center", "left1", "left", "right", "right1"];

const imagevariants = {
  center: { x: "0%", scale: 1, zIndex: 5 },
  left1: { x: "-50%", scale: 0.7, zIndex: 2 },
  left: { x: "-90%", scale: 0.5, zIndex: 1 },
  right: { x: "90%", scale: 0.5, zIndex: 1 },
  right1: { x: "50%", scale: 0.7, zIndex: 2 },
};

const Carousel = () => {
  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4]);

  const nextSlide = () => {
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map(
        (prevIndex) => (prevIndex + 1) % 5
      );
      return updatedIndexes;
    });
  };
  useEffect(() => {
    // Automatically change slide every 3 seconds (3000 milliseconds)
    const interval = setInterval(nextSlide, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-screen h-[90px] md:h-[300px] md:my-56">
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={image}
          className="rounded-[15px] shadow-md"
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imagevariants}
          transition={{ duration: 0.5 }}
          style={{ width: "40%", position: "absolute" }}
        />
      ))}
    </div>
  );
};

export default Carousel;
