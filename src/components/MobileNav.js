import React from 'react'
import Link from 'next/link';
import SocialMedia from './SocialMedia';

import { AiTwotoneHome } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { MdEventRepeat, MdRoundaboutRight } from "react-icons/md";
import { IoIosBookmarks } from "react-icons/io";
import { RiEmpathizeFill } from 'react-icons/ri'
import { BsRocketTakeoffFill } from 'react-icons/bs'
import {FaUserTag} from 'react-icons/fa'


const MobileNav = ({openedMenu, setOpenedMenu}) => {
  return (
    <div className="fixed top-[80px] left-0 flex flex-col justify-between bg-slate-950 text-white px-5 pt-5 w-screen h-screen z-50 overflow-auto">
      <div>
        <ul className="divide-y">
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <AiTwotoneHome />
              </span>
              Home
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/my-profile"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <ImProfile />
              </span>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/about-us"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <MdRoundaboutRight />
              </span>
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/events"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <MdEventRepeat />
              </span>
              Events
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/workers/attendance"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <IoIosBookmarks />
              </span>
              Workers Attendance
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/counselling"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <RiEmpathizeFill />
              </span>
              Counselling
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/youth-forum"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <BsRocketTakeoffFill />
              </span>
              Youth Forum
            </Link>
          </li>
          <li>
            <Link
              className="flex gap-2 pt-5"
              href="/registration"
              onClick={() => setOpenedMenu(false)}
            >
              <span>
                <FaUserTag />
              </span>
              Register
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <SocialMedia />
      </div>
    </div>
  );
}

export default MobileNav