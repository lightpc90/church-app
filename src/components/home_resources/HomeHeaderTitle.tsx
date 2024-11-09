"use client"

import React from 'react'
import { easeOut, motion } from 'framer-motion';
import Link from 'next/link';

const HomeHeaderTitle = () => {
  return (
    <div className="flex flex-col text-white gap-1 md:gap-5 font-bold w-10/12 md:w-8/12 lg:w-5/12 mt-[50px] ">
      <motion.p
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeOut }}
        className="text-2xl md:text-4xl overflow-hidden"
      >
        Experience God&apos;s Love through worship and fellowship at our Church.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: -50, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
        className="md:text-2xl text-zinc-400"
      >
        Experience a welcoming community and uplifting sermons at our church.
        All are welcome. Visit us and reach out with any question
      </motion.p>
      {/* buttons */}
      <div className="flex flex-wrap md:text-2xl max-w-[400px] md:max-w-[700px] gap-2  lg:gap-4 mt-5">
        <Link href={`/#connect`} className="bg-rose-800 w-[150px] md:w-fit  p-2 md:py-3 md:px-4 rounded-md">
          Connect with Us
        </Link>
        <Link href="#intro" className="border w-[150px] md:w-fit p-2 md:py-3 text-center  md:px-4 rounded-md">
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default HomeHeaderTitle