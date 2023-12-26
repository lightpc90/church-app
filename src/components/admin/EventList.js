"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/globalState";
import EventListLayout from "./EventListLayout";

const EventList = () => {
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

  const upcomingEvents = events?.filter(
    (event) =>
      event.eventDate &&
      new Date(event.eventDate).getTime() > new Date().getTime()
  );
  const pastEvents = events?.filter(
    (event) =>
      event.eventDate &&
      new Date(event.eventDate).getTime() < new Date().getTime()
  );
  const recurringEvents = events?.filter((event) => event.eventOccurrence);
  console.log("upcoming events: ", upcomingEvents);
  console.log("past events: ", pastEvents);
  console.log("past recurring: ", recurringEvents);
  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="mb-7">
        <div className="text-xl font-semibold">Upcoming Events</div>
        <div>
          {upcomingEvents.length > 0 ? (
            <div className="flex flex-col gap-2">
              {upcomingEvents.map((upcomingEvent, i) => (
                <EventListLayout key={i} event={upcomingEvent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Upcoming Events</p>
          )}
        </div>
      </div>
      <div className="mb-7">
        <div className="flex justify-center items-center text-xl font-semibold">
          Recurring Events
        </div>
        <div>
          {recurringEvents.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recurringEvents.map((recurringEvent, i) => (
                <EventListLayout key={i} event={recurringEvent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Recurring Events</p>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center text-xl font-semibold">
          Past Events
        </div>
        <div>
          {pastEvents.length > 0 ? (
            <div className="flex flex-col gap-2">
              {pastEvents.map((pastEvent, i) => (
                <EventListLayout key={i} event={pastEvent} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No Past Events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
