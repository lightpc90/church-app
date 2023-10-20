import React from 'react'

import { AiTwotoneHome } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { MdEventRepeat, MdRoundaboutRight } from "react-icons/md";
import { FaBlogger } from 'react-icons/fa'
import { RiEmpathizeFill } from 'react-icons/ri'
import {BsRocketTakeoffFill} from 'react-icons/bs'


const MobileNav = () => {
  return (
    <div className="fixed top-[80px] left-0 flex flex-col bg-slate-950 text-white px-5 pt-5 w-screen min-h-screen z-50 overflow-auto">
      <ul className="divide-y">
        <li className="flex gap-2 pt-5">
          <span>
            <AiTwotoneHome />
          </span>
          Home
        </li>
        <li className="flex gap-2 pt-5">
          <span>
            <ImProfile />
          </span>
          My Profile
        </li>
        <li className="flex gap-2 pt-5">
          <span>
            <MdRoundaboutRight />
          </span>
          About Us
        </li>
        <li className="flex gap-2 pt-5"><span><MdEventRepeat/></span>Events</li>
        <li className="flex gap-2 pt-5"><span><FaBlogger/></span>Blog</li>
        <li className="flex gap-2 pt-5"><span><RiEmpathizeFill/></span>Counselling</li>
        <li className="flex gap-2 pt-5"><span><BsRocketTakeoffFill/></span>Youth Forum</li>
      </ul>
    </div>
  );
}

export default MobileNav