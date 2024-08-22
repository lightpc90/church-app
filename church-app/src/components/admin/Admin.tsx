'use client'

import React from 'react'
import Overview from './overview/Overview'
import TabLinks from './TabLinks'
import { useSearchParams } from "next/navigation";
import { TabParams } from './TabLinks';
import Profile from './Profile';
import Workers from './workers/Workers';
import FollowUp from './follow-up/FollowUp';
import Testimonies from './testimonies/Testimonies';
import PrayerRequest from './prayer-request/Prayer-Request';
import HouseFellowshipCenters from './house-fellowship-centers/House-Fellowship-Centers';

const AdminComponent = () => {
    const searchParams = useSearchParams();
    const menu = searchParams.get("menu");
  return (
    <div className="flex">
      {/* left navigation pane */}
      <div className=" bg-blue-900 lg:text-lg font-semibold text-slate-400 h-screen w-[15%] flex flex-col items-center py-5 rounded-tr-[30px] rounded-br-[30px] shadow-lg">
        <div className="flex items-center gap-2 mb-5 text-blue-300">
          <div className="h-[50px] w-[50px] bg-slate-200 rounded-full"></div>
          <span className="text-sm">RCCG Beautiful Gate, lakowe</span>
        </div>
        <TabLinks menu={menu} />
      </div>
      {/* right pane for content */}
      <div className=" w-[85%] h-screen overflow-auto">
        <div className="h-[60px] border-b-2 border-blue-800 flex items-center px-5">
          <p className="font-bold">Administrator Dashboard</p>
          <div className='ml-auto'>
            <Profile />
          </div>
        </div>
        {menu === TabParams.OVERVIEW && <Overview />}
        {menu === TabParams.WORKERS && <Workers/>}
        {menu === TabParams.FOLLOW_UP && <FollowUp/>}
        {menu === TabParams.TESTIMONIES && <Testimonies/>}
        {menu === TabParams.PRAYER_REQUESTS && <PrayerRequest/>}
        {menu === TabParams.HOUSE_FELLOWSHIP && <HouseFellowshipCenters/>}
      </div>
    </div>
  );
}

export default AdminComponent