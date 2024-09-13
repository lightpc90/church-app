import React from "react";
import Header from "@/components/UILayouts/Header";
import headerImage from "../../../public/headers/event.png";
import { Events } from "@/components/data/Data";
import EventLayout from "@/components/UILayouts/EventLayout";

const Page = () => {
  const title = "Events";
  return (
    <div className="bg-[#D9D9D9] pb-10">
      <Header title={title} imageUrl={headerImage.src} />
      {/* Content */}
      <div className="p-5 my-5 flex flex-col gap-3 items-center">
        <h2 className="font-bold text-xl">Upcoming Events</h2>
        <div className="w-full flex flex-col gap-2 items-center">
          {Events.map((event, index) => (
            <EventLayout key={index} event={event} />
          ))}
        </div>
      </div>
      {/* past events */}
      <div className="p-5 my-5 flex flex-col gap-3 items-center">
        <h2 className="font-bold text-xl">Past Events</h2>
        <div></div>
      </div>
    </div>
  );
};

export default Page;
