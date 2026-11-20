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
} from "lucide-react";
import { TabParamsEnum } from "../enums/Enums";

export const AdminTabs = [
  { name: "Overview", param: TabParamsEnum.OVERVIEW, Icon: LayoutDashboard },
  { name: "Prayer Requests", param: TabParamsEnum.PRAYER_REQUESTS, Icon: HandHeart },
  { name: "Testimonies", param: TabParamsEnum.TESTIMONIES, Icon: Megaphone },
  { name: "Follow Up", param: TabParamsEnum.FOLLOW_UP, Icon: UserRoundPlus },
  { name: "Messages", param: TabParamsEnum.ENQUIRIES, Icon: Inbox },
  { name: "Registrations", param: TabParamsEnum.REGISTRATIONS, Icon: ClipboardList },
  { name: "House Fellowships", param: TabParamsEnum.HOUSE_FELLOWSHIP, Icon: House },
  { name: "Workers", param: TabParamsEnum.WORKERS, Icon: BriefcaseBusiness },
];
