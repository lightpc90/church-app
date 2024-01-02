"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/globalState";
import EventCardLayout from "./EventCardLayout";

const UpcomingEvents = () => {
  const { events, setEvents } = useAuth();

   const fetchEvents = async () => {
     console.log("inside fecthEvents function");
     const res = await fetch("/api/webContentsManagement/event_list");
     const allEvents = await res.json();
     console.log("allEvents object", allEvents);
     setEvents(allEvents.data);
   };

   useEffect(() => {
     console.log("inside effect...");
     if (events.length === 0) {
       console.log("entering conditional function in effect...");
       fetchEvents();
     }
   });

  const _upcomingEvents = events.filter((event) => (new Date(event.eventDate).setHours(parseInt(event.eventTime.split(':')[0])) > new Date().getTime()) )
  

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {_upcomingEvents?.map((event, i) => {
        return <EventCardLayout key={i} event={event} />;
      })}
    </div>
  );
};

export default UpcomingEvents;
