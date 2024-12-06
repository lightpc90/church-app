"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { GrMenu } from "react-icons/gr";
import { HiMenuAlt3 } from "react-icons/hi";

type MobileNavBarPropsType = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileNavbar: React.FC<MobileNavBarPropsType> = ({ menuOpen, setMenuOpen }) => {
  return (
      <div onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? <GrMenu size={30} /> : <HiMenuAlt3 size={30} />}
      </div>
  );
};

export default MobileNavbar;
