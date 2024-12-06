import Link from 'next/link';
import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { TbBrandYoutubeFilled } from "react-icons/tb";


const SocialMedia = () => {
  const username = `rccgbgplagos`
  return (
    <div className="lg:w-[30%] flex items-center gap-2 font-bold ">
      <Link
        href={`https://www.instagram.com/${username}/`}
        target="_blank"
        rel="noopener noreferrer"
       
      >
        <AiFillInstagram size={30} />
      </Link>
      <Link
        href={`https://www.facebook.com/rccgbglagos`}
        target="_blank"
        rel="noopener noreferrer"
     
      >
        <SiFacebook size={30} />
      </Link>
      <Link
        href={`https://www.youtube.com/@rccgbgplagos`}
        target="_blank"
        rel="noopener noreferrer"
      
      >
        <TbBrandYoutubeFilled size={30} />
      </Link>
      <span className="">rccgbgplagos</span>
    </div>
  );
}

export default SocialMedia