import React from "react";
import Logo from "./Logo";
import Links from "./Links";
import Link from "next/link";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 py-2 px-[20px] 
    lg:px-[100px] bg-zinc-900 opacity-80 text-white 
     flex items-center justify-between z-30 w-full overflow-hidden"
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
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
