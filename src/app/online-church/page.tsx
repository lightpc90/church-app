import LiveProgram from "@/components/livestream/LiveProgram";
import Header from "@/components/UILayouts/Header";
import React from "react";
import onlineChurch from "../../../public/headers/online-church.png"
import { FiSearch } from "react-icons/fi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { HiMiniPlayCircle } from "react-icons/hi2";

const page = () => {
  return (
    <div className="bg-[#D9D9D9] flex flex-col items-center justify-center gap-5">
      <Header
        title="Watch us Live, Explore Our Messages"
        imageUrl={onlineChurch.src}
      />
      <p className="font-bold text-2xl">Watch Us Live</p>
      <div className="bg-slate-500 w-[80%] h-[250px]">
        <LiveProgram />
      </div>

      {/* Audio and Video Messages */}
      <div className="flex flex-col items-center justify-center bg-white w-full">
        {/* Audio  Messages */}
        <div className="flex flex-col items-center gap-3 mb-10 w-full">
          <h2>Our Audio Messages</h2>
          <div className="flex bg-[#FDF9F9] rounded-full relative overflow-hidden">
            <input
              type="text"
              placeholder="Search Audio Messages"
              className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
            />
            {/* search icon */}
            <span className="absolute top-[50%] right-2 translate-y-[-50%] ">
              <FiSearch size={25} />
            </span>
          </div>
          {/* list of Audios */}
          <div className="w-full">
            <ul className="space-y-2">
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                1
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                2
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <HiMiniPlayCircle size={25} />
                </span>
                3
              </li>
            </ul>
          </div>
        </div>
        {/*  Video Messages */}
        <div className="flex flex-col items-center gap-3 w-full">
          <h2>Our Video Messages</h2>
          <div className="flex bg-[#FDF9F9] rounded-full relative overflow-hidden">
            <input
              type="text"
              placeholder="Search Video Messages"
              className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
            />
            {/* search icon */}
            <span className="absolute top-[50%] right-2 translate-y-[-50%] ">
              <FiSearch size={25} />
            </span>
          </div>
          {/* video iFrame */}
          <div className="w-[90%] h-[250px] bg-slate-500"></div>
          {/* list of Videos */}
          <div className="w-full">
            <ul className="space-y-2">
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <BiSolidMoviePlay size={25} />
                </span>
                1
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <BiSolidMoviePlay size={25} />
                </span>
                2
              </li>
              <li className=" bg-[#FDF9F9] p-2 flex gap-2 items-center">
                <span>
                  <BiSolidMoviePlay size={25} />
                </span>
                3
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
