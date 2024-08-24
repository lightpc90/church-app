"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { RiDashboard3Line } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { GiShadowFollower } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { FaPrayingHands } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { MdOutlineSettings } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { TabParamsEnum } from "../enums/Enums";
import { AdminTabsType } from "../types/types";

const AdminTabs = [
  {
    name: "Overview",
    param: TabParamsEnum.OVERVIEW,
    icon: <RiDashboard3Line size={30} />,
  },
  {
    name: "Workers",
    param: TabParamsEnum.WORKERS,
    icon: <MdOutlineWorkOutline size={30} />,
  },
  {
    name: "Follow Up",
    param: TabParamsEnum.FOLLOW_UP,
    icon: <GiShadowFollower size={30} />,
  },
  {
    name: "Testimonies",
    param: TabParamsEnum.TESTIMONIES,
    icon: <GrAnnounce size={30} />,
  },
  {
    name: "Prayer Requests",
    param: TabParamsEnum.PRAYER_REQUESTS,
    icon: <FaPrayingHands size={30} />,
  },
  {
    name: "House Fellowship Centers",
    param: TabParamsEnum.HOUSE_FELLOWSHIP,
    icon: <BiBuildingHouse size={30} />,
  },
];

type menuT = { menu: string | null };

const TabLinks = ({ menu }: menuT) => {
  return (
    <div className="flex flex-col lg:gap-3 items-center h-full z-40">
      {AdminTabs.map((tab, i) => (
        <Link
          href={`/admin?menu=${tab.param}`}
          key={i}
          className={`p-1 lg:p-2  lg:text-lg  transition-transform transform hover:scale-110 lg:w-full rounded-md lg:rounded-2xl flex my-3 lg:my-0 justify-center ${
            menu === tab.param
              ? "bg-blue-900 shadow-lg text-white border "
              : "bg-blue-900 shadow-lg "
          }`}
        >
          <span className="flex lg:gap-2 items-center">
            <span>{tab.icon}</span>
            <p className="hidden md:flex">{tab.name}</p>
          </span>
        </Link>
      ))}
      {/* HOME, SETTINGS AND LOGOUT BUTTON */}
      <div className="flex flex-col items-center lg:items-start lg:w-full gap-2 mt-auto mb-2">
        {/* Home button */}
        <Link
          href={`/`}
          className={`flex lg:gap-2 p-2 transition-transform transform hover:scale-110 rounded-2xl 
            justify-center items-center 
            `}
        >
          <span>
            <SiHomebridge size={30} />
          </span>
          <span className="hidden lg:flex">Home</span>
        </Link>
        {/* Setting Button */}
        <Link
          href={`/admin?menu=settings`}
          className={`p-2 lg:gap-2 transition-transform transform hover:scale-110 rounded-2xl flex justify-center ${
            menu === "settings"
              ? "bg-blue-900 shadow-lg text-white border "
              : "bg-zinc-800 shadow-lg "
          }`}
        >
          <span>
            <MdOutlineSettings size={30} />
          </span>
          <span className="hidden lg:flex">Settings</span>
        </Link>
        {/* Logout button */}
        <Link
          href={`/logout`}
          className="flex lg:gap-2 p-2 transition-transform transform hover:scale-110 rounded-2xl justify-center items-center bg-rose-800 shadow-lg"
        >
          <span>
            <BiLogOutCircle size={30} />
          </span>
          <span className="hidden lg:flex">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default TabLinks;
