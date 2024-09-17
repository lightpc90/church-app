import Image from "next/image";
import React from "react";

type PastorLayoutPropsType = {
  pastorData: {
    name: string;
    image: string;
    fb?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
};

const PastorLayout: React.FC<PastorLayoutPropsType> = ({ pastorData }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="h-[180px] w-[180px] rounded-full bg-white overflow-hidden">
        <Image src={pastorData.image} alt="" width={400} height={400} loading='eager' className="h-full w-full object-cover object-center" />
      </div>
      <div className="absolute bottom-[-40px] p-2 text-rose-800 bg-white shadow-xl h-[80px] w-[70%] left-[50%] translate-x-[-50%] rounded-md">
        {pastorData.name}
      </div>
    </div>
  );
};

export default PastorLayout;
