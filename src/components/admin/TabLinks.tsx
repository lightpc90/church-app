"use client";

import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  UserRoundPlus,
  Megaphone,
  HandHeart,
  House,
  Settings,
  LogOut,
  Globe,
} from "lucide-react";
import { TabParamsEnum } from "../enums/Enums";
import { cn } from "@/lib/utils";

export const AdminTabs = [
  { name: "Overview", param: TabParamsEnum.OVERVIEW, Icon: LayoutDashboard },
  { name: "Workers", param: TabParamsEnum.WORKERS, Icon: BriefcaseBusiness },
  { name: "Follow Up", param: TabParamsEnum.FOLLOW_UP, Icon: UserRoundPlus },
  { name: "Testimonies", param: TabParamsEnum.TESTIMONIES, Icon: Megaphone },
  { name: "Prayer Requests", param: TabParamsEnum.PRAYER_REQUESTS, Icon: HandHeart },
  { name: "House Fellowships", param: TabParamsEnum.HOUSE_FELLOWSHIP, Icon: House },
];

const itemClass = (active: boolean) =>
  cn(
    "flex items-center justify-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors lg:justify-start",
    active ? "bg-gold text-ink" : "text-white/65 hover:bg-white/10 hover:text-white"
  );

const TabLinks = ({ menu }: { menu: string | null }) => (
  <aside className="fixed inset-y-0 left-0 z-30 flex w-20 flex-col bg-ink px-3 py-5 lg:w-72 lg:px-5">
    <Link href="/admin" className="mb-8 flex items-center justify-center gap-3 lg:justify-start lg:px-2">
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-white">
        <Image src="/images/logo-512.png" alt="" fill sizes="40px" className="scale-[1.35] object-contain" />
      </span>
      <span className="hidden leading-tight lg:block">
        <span className="block font-display text-lg text-white">Beautiful Gate</span>
        <span className="block text-[0.68rem] font-semibold tracking-[0.2em] text-white/50 uppercase">Admin</span>
      </span>
    </Link>

    <nav aria-label="Admin" className="flex flex-1 flex-col gap-1">
      {AdminTabs.map(({ name, param, Icon }) => (
        <Link
          key={param}
          href={`/admin?menu=${param}`}
          aria-current={menu === param ? "page" : undefined}
          title={name}
          className={itemClass(menu === param)}
        >
          <Icon className="size-5 shrink-0" aria-hidden />
          <span className="hidden lg:inline">{name}</span>
        </Link>
      ))}
    </nav>

    <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
      <Link href="/" title="View website" className={itemClass(false)}>
        <Globe className="size-5 shrink-0" aria-hidden />
        <span className="hidden lg:inline">View website</span>
      </Link>
      <Link
        href={`/admin?menu=${TabParamsEnum.SETTINGS}`}
        title="Settings"
        aria-current={menu === TabParamsEnum.SETTINGS ? "page" : undefined}
        className={itemClass(menu === TabParamsEnum.SETTINGS)}
      >
        <Settings className="size-5 shrink-0" aria-hidden />
        <span className="hidden lg:inline">Settings</span>
      </Link>
      <SignOutButton redirectUrl="/">
        <button type="button" title="Log out" className={cn(itemClass(false), "w-full hover:bg-ember/20 hover:text-white")}>
          <LogOut className="size-5 shrink-0" aria-hidden />
          <span className="hidden lg:inline">Log out</span>
        </button>
      </SignOutButton>
    </div>
  </aside>
);

export default TabLinks;
