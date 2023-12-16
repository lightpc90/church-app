'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import countdownTimer from "@/utilities/countdownTimer";
import Image from "next/image";

const EventCardLayout = ({event}) => {
   
  const eventDate = new Date(event.eventDate)
  const year = eventDate.getUTCFullYear()
  const month = eventDate.getUTCMonth()
  const day = eventDate.getUTCDate();
  const eventTime = event.eventTime
  const [hours, minutes] = eventTime.split(':').map(Number)

  const eventFullDate = new Date(year, month, day, hours, minutes)

    const [eventTimeRemaining, setEventTimeRemaining] = useState(
      countdownTimer(eventFullDate)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            const remainingTime = countdownTimer(eventFullDate); 
            setEventTimeRemaining(remainingTime);
            if (remainingTime <= 0) {
              return () => {
                clearInterval(timer);
              };
            }
        }, 1000);
        return (()=>{clearInterval(timer)})
      }, [])
      
    const formatTime = (time) => {
      return time.toString().padStart(2, "0");
    };
  
  console.log("event time remaining", formatTime(eventTimeRemaining.total));

  
  return (
    <div className="flex flex-col md:w-5/12 lg:w-3/12 w-10/12 shadow-md hover:shadow-2xl">
      <div className=" h-52 lg:h-[400px] bg-slate-800 shadow-md bg-cover bg-center bg-no-repeat">
        <Image
          src={event.eventImage}
          alt="event flier"
          width={1200}
          height={1200}
          className="w-full h-full"
        />
      </div>
      <div className=" bg-white min-h-32 md:h[200px] w-full items-center">
        <div className="flex flex-col p-3 md:p-5 font-mono justify-items-start ">
          <p className="text-pink-500 font-bold text-xl lg:text-2xl">
            {event.eventName}
          </p>
          <p className="text-md font-semibold lg:text-2xl">{event.eventOccurrence && event.eventOccurrence}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <h5>{event.eventTime}</h5>
            <p>{!event.eventOccurrence && ''}</p>
          </div>
          {!event.eventOccurrence && eventTimeRemaining.total > 0 && (
            <div className="flex gap-2 font-semibold text-xl lg:text-2xl">
              <div className="text-sky-800">{formatTime(eventTimeRemaining.days)}Days</div>
              <div className="text-purple-800">{formatTime(eventTimeRemaining.hours)}Hrs</div>
              <div className="text-cyan-600">{formatTime(eventTimeRemaining.minutes)}Mins</div>
              <div className="text-pink-500">{formatTime(eventTimeRemaining.seconds)}Secs</div>
            </div>
          )}
          {event.eventRegLink && (
            <Link href={event.eventRegLink}>Register here</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCardLayout;
