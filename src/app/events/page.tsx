import React from "react";
import Header from "@/components/UILayouts/Header";
import headerImage from "../../../public/headers/event.png";
import { Events } from "@/components/data/Data";
import EventLayout from "@/components/UILayouts/EventLayout";
import EmptyEvent from "@/components/UILayouts/EmptyEvent";

const Page = () => {
  const title = "Events";
  return (
    <div className="bg-[#D9D9D9] pb-10 flex flex-col items-center ">
      <Header title={title} imageUrl={headerImage.src} />
      {/* Content */}
      <div className="w-[90%] lg:w-[50%] flex flex-col gap-5 lg:gap-[100px]">
        <div className="p-5 my-5 flex flex-col gap-3 items-center">
          <h2 className="font-bold text-xl">Upcoming Events</h2>
          <div className="w-full flex flex-col gap-2 lg:gap-6 items-center">
            {Events.map((event, index) => (
              <EventLayout key={index} event={event} />
            ))}
          </div>
        </div>
        {/* past events */}
        <div className="p-5 my-5 flex flex-col gap-3 items-center">
          <h2 className="font-bold text-xl">Past Events</h2>
          <div>
            {/* empty event */}
            <div>
              <EmptyEvent text={"No Past Event"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
