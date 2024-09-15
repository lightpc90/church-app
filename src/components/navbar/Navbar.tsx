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
     <div className="bg-blue-900 pl-5 pt-[90px] fixed top-0 left-0 w-full h-full z-30">
      {/* links */}
      <div className="flex flex-col w-full gap-2 text-white">
      <Link href={`/`}>
        Home
      </Link>
      </div>

     </div>)}
    </>
  );
};

export default Navbar;
