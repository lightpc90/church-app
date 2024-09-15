'use client'

import {useState} from "react";
import Logo from "./Logo";
import Links from "./Links";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className="fixed top-0 left-0 py-2 px-[20px] 
      lg:px-[100px] bg-zinc-900 opacity-80 text-white 
      flex items-center justify-between z-50 w-full overflow-hidden"
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
          <div className="flex flex-col w-full gap-3 text-white">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Home
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              How Can I Be Saved?
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Online Church
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Online Giving
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Prayer Request
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Share Testimony
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Workers
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Our Natural Groups and Ministries
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              House Fellowship Centers
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Events
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              Contact
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <Link className="font-bold pl-5 " href={`/`}>
              About Us
            </Link>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
