'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/rccg_logo_trans.png";
import MobileNav from "./MobileNav";

import { FaDoorOpen, FaDoorClosed } from "react-icons/fa";


const Nav = () => {
    const [openedMenu, setOpenedMenu] = useState(false)

  return (
    <div>
      <div className="fixed top-0 left-0 z-20 text-white drop-shadow-md flex justify-around items-center w-screen h-20 bg-[#0d0530] opacity-90">
        {/* left navigation contents */}
        <div>
          <ul className="font-medium md:text-2xl font-sans flex justify-center items-center gap-1">
            <li className="w-[65px] md:w-[80px]">
              <Image src={logo} alt="rccg logo" />
            </li>
            <li>Beautiful Gate, Lakowe</li>
          </ul>
        </div>

        {/* right navigation contents */}
        <div>
          <ul className="text-xl md:text-2xl hidden md:inline-flex  font-sans gap-5">
            <li className=" hover:font-medium">
              <Link href="/">Home</Link>
            </li>
            <li className=" hover:font-medium">
              <Link href="/About">About</Link>
            </li>
            <li className=" hover:font-medium">
              <Link href="/Testimonies">Testimonies</Link>
            </li>
            <li className=" hover:font-medium">
              <Link href="/Events">Events</Link>
            </li>
            <li className=" hover:font-medium">
              <Link href="/Stories">Stories</Link>
            </li>
          </ul>
        </div>

        {/* Login and toggle menu */}
        <div className="flex justify-center md:text-xl items-center">
          <Link href="/login">
            <button onClick={()=>setOpenedMenu(false)} className="py-1 px-3 md:px-6  m-2 bg-slate-700 text-white hover:text-slate-900 hover:bg-slate-400 shadow-lg rounded-3xl">
              Login
            </button>
          </Link>
          <button
            onClick={() => setOpenedMenu(!openedMenu)}
            className="md:hidden"
          >
            {!openedMenu ? (
              <h2>
                <FaDoorClosed />
              </h2>
            ) : (
              <h2>
                <FaDoorOpen />
              </h2>
            )}
          </button>
        </div>
      </div>
      {/* mobile menu here */}
          {openedMenu && <MobileNav openedMenu={openedMenu} setOpenedMenu={setOpenedMenu} />}
    </div>
  );
};

export default Nav;
