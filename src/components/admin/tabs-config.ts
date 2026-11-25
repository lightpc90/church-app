// Shared by the server admin page (titles) and the client sidebar.
// Must not live in a "use client" module: server code importing a plain value from one
// receives a client reference instead of the array.
import {
  LayoutDashboard,
  BriefcaseBusiness,
  UserRoundPlus,
  Megaphone,
  HandHeart,
  House,
  Inbox,
  ClipboardList,
  UsersRound,
  BellRing,
} from "lucide-react";
import { TabParamsEnum } from "../enums/Enums";
import type { Resource } from "@/lib/roles";

/** `resource` decides who sees the tab (needs "view"); `superAdmin` tabs are grouped separately. */
export const AdminTabs: { name: string; param: TabParamsEnum; Icon: typeof LayoutDashboard; resource: Resource; superAdmin?: boolean }[] = [
  { name: "Overview", param: TabParamsEnum.OVERVIEW, Icon: LayoutDashboard, resource: "overview" },
  { name: "Prayer Requests", param: TabParamsEnum.PRAYER_REQUESTS, Icon: HandHeart, resource: "prayerRequests" },
  { name: "Testimonies", param: TabParamsEnum.TESTIMONIES, Icon: Megaphone, resource: "testimonies" },
  { name: "Follow Up", param: TabParamsEnum.FOLLOW_UP, Icon: UserRoundPlus, resource: "followUps" },
  { name: "Messages", param: TabParamsEnum.ENQUIRIES, Icon: Inbox, resource: "enquiries" },
  { name: "Registrations", param: TabParamsEnum.REGISTRATIONS, Icon: ClipboardList, resource: "registrations" },
  { name: "House Fellowships", param: TabParamsEnum.HOUSE_FELLOWSHIP, Icon: House, resource: "houseFellowships" },
  { name: "Workers", param: TabParamsEnum.WORKERS, Icon: BriefcaseBusiness, resource: "workers" },
  { name: "Team & Roles", param: TabParamsEnum.TEAM, Icon: UsersRound, resource: "team", superAdmin: true },
  { name: "Notifications", param: TabParamsEnum.NOTIFICATIONS, Icon: BellRing, resource: "notifications", superAdmin: true },
];
