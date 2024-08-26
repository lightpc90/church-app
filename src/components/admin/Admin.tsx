"use client";

import React from "react";
import Overview from "./overview/Overview";
import TabLinks from "./TabLinks";
import { useSearchParams } from "next/navigation";
import { TabParamsEnum } from "../enums/Enums";
import Profile from "./Profile";
import Workers from "./workers/Workers";
import FollowUp from "./follow-up/FollowUp";
import Testimonies from "./testimonies/Testimonies";
import PrayerRequest from "./prayer-request/Prayer-Request";
import HouseFellowshipCenters from "./house-fellowship-centers/House-Fellowship-Centers";
import logo from '../../../public/rrcg-mylogo.png'
import Image from "next/image";

const AdminComponent = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get("menu");
  return (
    <div className="flex h-[100vh] overflow-auto">
      {/* left navigation pane */}
      <div className="fixed top-0 left-0 z-30 h-screen bg-blue-900 lg:text-lg font-semibold text-slate-400  
      flex-2 flex flex-col items-center py-5 rounded-tr-[30px] 
      rounded-br-[30px] shadow-lg lg:px-5">
        <div className="flex items-center gap-1 pb-5 text-blue-300">
          <div className="rounded-full w-[60px] h-[60px]  flex items-center justify-center overflow-hidden">
            <div className="w-full h-full object-cover">
              <Image src={logo} priority alt="logo" />
            </div>
          </div>
          <span className="hidden lg:flex text-sm">RCCG Beautiful Gate, lakowe</span>
        </div>
        <TabLinks menu={menu} />
      </div>
      {/* right pane for content */}
      <div className="flex-8 ml-[20vw] z-20">
        <div className="fixed top-0 left-0 right-0 pl-[20vw] h-[60px] pr-5 flex items-center lg:pr-[200px] bg-zinc-200 rounded-md lg:rounded-full" >
          <p className="font-bold text-sm">Admin Dashboard</p>
          <div className="ml-auto">
            <Profile />
          </div>
        </div>
        <div className="p-2 mt-[60px]">
          {menu === TabParamsEnum.OVERVIEW && <Overview />}
          {menu === TabParamsEnum.WORKERS && <Workers />}
          {menu === TabParamsEnum.FOLLOW_UP && <FollowUp />}
          {menu === TabParamsEnum.TESTIMONIES && <Testimonies />}
          {menu === TabParamsEnum.PRAYER_REQUESTS && <PrayerRequest />}
          {menu === TabParamsEnum.HOUSE_FELLOWSHIP && <HouseFellowshipCenters />}
        </div>
      </div>
    </div>
  );
};

export default AdminComponent;
