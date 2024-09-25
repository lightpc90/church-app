"use client"

import React, { ReactElement, ReactNode } from 'react'
import Link from 'next/link';
import {easeOut, motion} from  "framer-motion"
import { IconType } from 'react-icons/lib';

type WhatNextCardLayoutType = {
   cardData: { 
    icon: IconType;
    title: string;
    content: string;
    linkref: string;
    linkname: string;
    bg:string
}
}

const WhatNextCardsLayout: React.FC<WhatNextCardLayoutType> = ({cardData}) => {
    const {icon:Icon} = cardData
  return (
    <motion.div
    initial={{opacity: 0, scale: 0.8}}
    whileInView={{opacity: 1, scale: 1}}
    transition={{duration: 0.5, delay: 0.3, ease: easeOut}}
      className={`flex flex-col justify-evenly w-[300px] h-[310px] ${cardData.bg} rounded-2xl shadow-lg p-4 text-white`}
    >
      <div className="flex gap-4 text-2xl items-center">
        {/* title icon */}
        <Icon size={70} />
        {/* title */}
        <h2 className="font-bold">{cardData.title}</h2>
      </div>
      {/* content */}
      <p className="font-bold text-zinc-400">{cardData.content}</p>
      {/* call to action */}
      <Link
        href={cardData.linkref}
        className="border py-2 px-4 rounded-full w-fit "
      >
        {cardData.linkname}
      </Link>
    </motion.div>
  );
}

export default WhatNextCardsLayout