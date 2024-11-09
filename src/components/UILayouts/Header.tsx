import { FC } from "react";
import Image from "next/image";

type HeaderPropsType = {
  title: string;
  imageUrl: string;
};

const Header: FC<HeaderPropsType> = ({ title, imageUrl }) => {
  return (
    <div className="relative w-full h-[40vh] lg:h-[60vh] overflow-hidden">
      <Image
        src={imageUrl}
        height={500}
        width={500}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover object-center"
      />
      <div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-950 via-slate-900 
        opacity-90 flex place-items-end"
      >
        <p className="w-full text-white p-2 lg:p-5 text-2xl font-bold border-l-4 ml-2 mb-2 md:ml-5 md:mb-5">{title}</p>
      </div>
    </div>
  );
};

export default Header;
