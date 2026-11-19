"use client";

import { useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Overview from "./overview/Overview";
import TabLinks, { AdminTabs } from "./TabLinks";
import { TabParamsEnum } from "../enums/Enums";
import Workers from "./workers/Workers";
import FollowUp from "./follow-up/FollowUp";
import Testimonies from "./testimonies/Testimonies";
import PrayerRequest from "./prayer-request/Prayer-Request";
import HouseFellowshipCenters from "./house-fellowship-centers/House-Fellowship-Centers";
import Settings from "./settings/Settings";

const AdminComponent = () => {
  const menu = useSearchParams().get("menu") ?? TabParamsEnum.OVERVIEW;
  const title =
    AdminTabs.find((t) => t.param === menu)?.name ?? (menu === TabParamsEnum.SETTINGS ? "Settings" : "Dashboard");

  return (
    <div className="min-h-dvh bg-ivory">
      <TabLinks menu={menu} />
      <div className="pl-20 lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-ivory/85 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Admin</p>
            <h1 className="font-display text-xl font-medium text-ink">{title}</h1>
          </div>
          <UserButton />
        </header>
        <main className="p-5 sm:p-8">
          {menu === TabParamsEnum.OVERVIEW && <Overview />}
          {menu === TabParamsEnum.WORKERS && <Workers />}
          {menu === TabParamsEnum.FOLLOW_UP && <FollowUp />}
          {menu === TabParamsEnum.TESTIMONIES && <Testimonies />}
          {menu === TabParamsEnum.PRAYER_REQUESTS && <PrayerRequest />}
          {menu === TabParamsEnum.HOUSE_FELLOWSHIP && <HouseFellowshipCenters />}
          {menu === TabParamsEnum.SETTINGS && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default AdminComponent;
