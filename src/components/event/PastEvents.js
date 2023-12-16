import React from "react";
import { useAuth } from "@/context/globalState";
import EventCardLayout from "./EventCardLayout";

const PastEvents = () => {
  const { events } = useAuth();
  const pastEvents = events.filter(
    (event) =>
      event.eventDate && new Date(event.eventDate).getTime() < new Date().getTime()
  );
  return (
    <div>
      {pastEvents.map((event, i) => (
        <EventCardLayout key={i} event={event} />
      ))}
    </div>
  );
};

export default PastEvents;
