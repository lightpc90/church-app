"use client";

import React from "react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";

export enum TabParams {
  OVERVIEW = "overview",
  WORKERS = "workers",
  FOLLOW_UP = "follow-up",
  TESTIMONIES = "testimonies",
  PRAYER_REQUESTS = "prayer-requests",
  HOUSE_FELLOWSHIP = "house-fellowship-centers",
}

const AdminTabs = [
  { name: "Overview", param: TabParams.OVERVIEW },
  { name: "Workers", param: TabParams.WORKERS },
  { name: "Follow Up", param: TabParams.FOLLOW_UP },
  { name: "Testimonies", param: TabParams.TESTIMONIES },
  { name: "Prayer Requests", param: TabParams.PRAYER_REQUESTS },
  { name: "House Fellowship Centers", param: TabParams.HOUSE_FELLOWSHIP },
];

type menuT={menu: string | null}

const TabLinks = ({menu}:menuT) => {
 

  return (
    <div className="flex flex-col lg:gap-3 items-center h-full">
      {AdminTabs.map((tab, i) => (
        <Link
          href={`/admin?menu=${tab.param}`}
          key={i}
          className={`p-2  lg:text-lg  transition-transform transform hover:scale-110 w-full rounded-2xl flex justify-center ${
            menu === tab.param
              ? "bg-blue-900 shadow-lg text-white border "
              : "bg-blue-900 shadow-lg "
          }`}
        >
          <p>{tab.name}</p>
        </Link>
      ))}

      <div className="flex flex-col gap-2 mt-auto">
        <Link
          href={`/admin?menu=settings`}
          className={`p-2 transition-transform transform hover:scale-110 rounded-2xl flex justify-center ${
            menu === 'settings'
              ? "bg-blue-900 shadow-lg text-white border "
              : "bg-blue-900 shadow-lg "
          }`}
        >
          Settings
        </Link>
        <Link href={`/logout`}>Log Out</Link>
      </div>
    </div>
  );
};

export default TabLinks;
