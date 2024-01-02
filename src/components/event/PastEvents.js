'use client'

import React from "react";
import { useAuth } from "@/context/globalState";
import EventCardLayout from "./EventCardLayout";

const PastEvents = () => {
  const { events } = useAuth();
  const pastEvents = events.filter(
    (event) =>
      event.eventDate && new Date(event.eventDate).setHours(parseInt(event.eventTime.split(':')[0])) < new Date().getTime()
  );
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {pastEvents?.map((event, i) => (
        <EventCardLayout key={i} event={event} />
      ))}
    </div>
  );
};

export default PastEvents;
