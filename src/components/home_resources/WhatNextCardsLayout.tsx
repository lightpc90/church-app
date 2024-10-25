
import React from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import CardIcon from "./CardIcon";

export type WhatNextCardLayoutType = {
  cardData: {
    iconName: string;
    iconFamily: string;
    title: string;
    content: string;
    linkref: string;
    linkname: string;
    bg: string;
  };
};

const WhatNextCardsLayout: React.FC<WhatNextCardLayoutType> = ({
  cardData,
}) => {
 
  return (
    <div
      className={`flex flex-col justify-evenly w-[300px] h-[310px] ${cardData.bg} rounded-2xl shadow-lg p-4 text-white`}
    >
      <div className="flex gap-4 text-2xl items-center">
        {/* title icon */}
        <CardIcon cardData={cardData} />
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
    </div>
  );
};

export default WhatNextCardsLayout;
