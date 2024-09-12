import { FC } from "react";
import Image from "next/image";

type HeaderPropsType = {
  title: string;
  imageUrl: string;
};

const Header: FC<HeaderPropsType> = ({ title, imageUrl }) => {
  return (
    <div className="relative w-full h-[40vh">
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
        <p className="text-white p-5 text-2xl font-bold">{title}</p>
      </div>
    </div>
  );
};

export default Header;
