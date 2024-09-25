import Link from 'next/link';
import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { TbBrandYoutubeFilled } from "react-icons/tb";

const SocialMedia = () => {
  return (
    <div className="lg:w-[30%] flex items-center gap-2 font-bold ">
      <Link href={`/`} className=" ">
        <AiFillInstagram size={30}/>
      </Link>
      <Link href={`/`} className=" ">
        <SiFacebook size={30}/>
      </Link>
      <Link href={`/`} className="">
        <TbBrandYoutubeFilled size={30}/>
      </Link>
      <span className="">rccgbgplagos</span>
    </div>
  );
}

export default SocialMedia