import Link from "next/link";
import React from "react";
import bg from "../../../public/headers/workers.png";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";

const Page = () => {
  return (
    <div className=" relative h-screen-dynamic">
      <Image
        src={bg}
        alt=""
        className="h-full w-full object-cover object-center"
      />
      {/* gradient overlay */}
      <div className="px-5 py-10 absolute top-0 left-0 w-full h-full bg-gradient-to-t flex flex-col items-center justify-between from-slate-950 via-slate-700 opacity-90 ">
        <Link
          href={``}
          className="text-white flex gap-2 items-center text-left w-full"
        >
          <span>
            <IoMdArrowRoundBack size={25} />
          </span>
          <span>Back</span>
        </Link>
        <div className="flex flex-col items-center gap-1 z-30">
          <h3 className="text-white">RCCG Beautiful Gate, Lakowe</h3>
          <p className="text-[#EE7575]">Workers&apos; space</p>
          <button className="py-2 px-10 bg-white text-slate-950 font-bold shadow-lg rounded-md z-30">
            Register With Gmail
          </button>
          <div className="flex gap-2 items-center text-white">
            <p>Already have an account?</p>
            <Link href={``}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
