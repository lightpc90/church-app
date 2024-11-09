"use client";

import React from "react";
import Image from "next/image";
import { ChurchWelcomeParagraph } from "../data/Data";
import PastorImage from "../../../public/pastor.png";

import { easeIn, easeOut, motion } from "framer-motion";

const WelcomeMessage = () => {
  return (
    <div
      id="intro"
      className="flex flex-wrap gap-4 lg:gap-10 w-[100vw] md:w-[70%] overflow-hidden p-[20px] items-center justify-center my-10 "
    >
      <div className="w-full lg:w-[30%] ">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeOut }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-2xl text-center font-bold lg:text-3xl">
            {ChurchWelcomeParagraph.title}
          </h1>
          <h4 className="font-bold text-slate-700 mb-[50px] lg:text-2xl">
            {ChurchWelcomeParagraph.description}
          </h4>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: easeOut }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-justify lg:text-2xl"
        >
          {ChurchWelcomeParagraph.paragraph}
        </motion.p>
      </div>
      {/* welcome image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: easeOut }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full lg:w-[40%]  rounded-md overflow-hidden shadow-md h-[400px] lg:h-[600px] bg-slate-300"
      >
        {/* Pastor Picture coming here */}
        <Image
          src={PastorImage}
          alt="pastor picture"
          loading="eager"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>
    </div>
  );
};

export default WelcomeMessage;
