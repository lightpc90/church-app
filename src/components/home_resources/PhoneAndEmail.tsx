'use client'

import React from 'react'
import { FaSquarePhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';

const PhoneAndEmail = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.9}}
    className="bg-slate-950 text-white opacity-90 w-[100%] px-5 lg:px-10 py-1 flex flex-col gap-1 items-end">
      <div className="flex gap-2 items-center">
        <FaSquarePhone />
        <span>08112345678</span>
      </div>
      <div className="flex gap-2 items-center">
        <MdEmail />
        <span>ctlbeautifulgate@gmail.com</span>
      </div>
    </motion.div>
  );
}

export default PhoneAndEmail