'use client'

import {useState} from "react";
import Logo from "./Logo";
import Links from "./Links";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

import { AiFillHome } from "react-icons/ai";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { SiWikimediafoundation } from "react-icons/si";
import { GiGiftOfKnowledge } from "react-icons/gi";
import { GiPrayer } from "react-icons/gi";
import { RiUserSharedFill } from "react-icons/ri";
import { MdWorkspacePremium } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BiSolidBuildingHouse } from "react-icons/bi";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { RiCustomerServiceFill } from "react-icons/ri";
import { BsFillBriefcaseFill } from "react-icons/bs";
import SocialMedia from "../social-media/SocialMedia";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className="fixed top-0 left-0 py-2 px-[20px] 
      lg:px-[100px] bg-zinc-900 opacity-80 text-white 
      flex items-center justify-between z-50 w-[100vw] overflow-hidden"
      >
        <Logo />

        <Links />
        <div className="flex gap-3 items-center ">
          {/*login*/}
          <Link
            href={"/loginPage"}
            className="hidden lg:flex font-bold bg-blue-900 py-2 px-4 rounded-md"
          >
            login
          </Link>
          
          {/* profile picture wrapper */}
          <div className="lg:hidden">
            <MobileNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      </div>
      {/* mobile links */}
      {menuOpen && (
        <div className="bg-zinc-900  pt-[90px] fixed top-0 left-0 w-full h-full z-40">
          {/* links */}
          <div className="flex flex-col w-full gap-3 text-white h-[80%] overflow-auto">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center"
              href={`/`}
              onClick={() => setMenuOpen(false)}
            >
              <AiFillHome />
              Home
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex items-center gap-2 "
              href={`/how-can-i-be-saved`}
              onClick={() => setMenuOpen(false)}
            >
              <AiFillSafetyCertificate />
              How Can I Be Saved?
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/online-church`}
              onClick={() => setMenuOpen(false)}
            >
              <SiWikimediafoundation />
              Online Church
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/online-giving`}
              onClick={() => setMenuOpen(false)}
            >
              <GiGiftOfKnowledge />
              Online Giving
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/prayer-request`}
              onClick={() => setMenuOpen(false)}
            >
              <GiPrayer />
              Prayer Request
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/testimony`}
              onClick={() => setMenuOpen(false)}
            >
              <RiUserSharedFill />
              Share Testimony
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/workers`}
              onClick={() => setMenuOpen(false)}
            >
              <MdWorkspacePremium />
              Workers
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/groups-and-ministries`}
              onClick={() => setMenuOpen(false)}
            >
              <HiMiniUserGroup />
              Our Natural Groups and Ministries
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/house-fellowship-centers`}
              onClick={() => setMenuOpen(false)}
            >
              <BiSolidBuildingHouse />
              House Fellowship Centers
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/events`}
              onClick={() => setMenuOpen(false)}
            >
              <BsFillCalendarEventFill />
              Events
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/contact-us`}
              onClick={() => setMenuOpen(false)}
            >
              <RiCustomerServiceFill />
              Contact
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link
              className="font-bold pl-5 flex gap-2 items-center "
              href={`/about-us`}
              onClick={() => setMenuOpen(false)}
            >
              <BsFillBriefcaseFill />
              About Us
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
          <div className="text-white text-center w-full pl-5 pt-5">
            <SocialMedia />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
