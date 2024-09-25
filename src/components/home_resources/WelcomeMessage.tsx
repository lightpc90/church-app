import React from 'react'
import Image from 'next/image';
import { ChurchWelcomeParagraph } from '../data/Data';
import PastorImage from "../../../public/pastor.png;


const WelcomeMessage = () => {
  return (
    <div className="flex flex-wrap gap-4 lg:gap-10 w-[100vw] overflow-hidden p-[20px] items-center justify-center my-10 ">
      {/* paragraph */}
      <div className="w-full lg:w-[30%]">
        <div className="text-center">
          <h1 className="text-2xl text-center font-bold ">
            {ChurchWelcomeParagraph.title}
          </h1>
          <h4 className="font-bold text-slate-700">
            {ChurchWelcomeParagraph.description}
          </h4>
        </div>
        <p className="text-justify ">{ChurchWelcomeParagraph.paragraph}</p>
      </div>
      {/* welcome image */}
      <div className="w-full lg:w-[40%] rounded-md overflow-hidden shadow-md h-[400px] bg-slate-300">
        {/* Pastor Picture coming here */}
        <Image
          src={PastorImage}
          alt="pastor picture"
          loading="eager"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}

export default WelcomeMessage