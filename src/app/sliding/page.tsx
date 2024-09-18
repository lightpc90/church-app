import React from 'react'
import Image from 'next/image';
import test from "../../../public/Ch1.jpg"

const Page = () => {
  return (
    <div className="relative w-[100vw] flex items-center justify-center h-[500px] overflow-hidden ">
      <div className="absolute w-[130%] flex items-center justify-center inset-0">
        <Image
          src={test}
          alt="Sliding Image"
          loading="eager"
          className="w-full h-full object-cover object-center animate-slide"
        />
      </div>
    </div>
  );
}

export default Page