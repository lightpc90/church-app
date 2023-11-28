'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import countdownTimer from "@/utilities/countdownTimer";

const EventCardLayout = (cardData) => {
    
  const carddata = {
    flier: "/good_morning_holy_spirit1.jpg",
    eventName: "GOOD MORNIG HOLY SPIRIT",
    description: "EVERY 1ST DAY OF THE MONTH",
    date: "26/11/2023",
    time: "4pm",
    regLink: "",
    recurring: true,
  };
    
    const eventDate = cardData.carddata
    const eventTime = cardData.time
    const eventFullDate = new Date(eventDate).setHours(eventTime, 0, 0, 0)
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
  
  return (
    <div
      className="relative h-80 lg:h-[400px] md:w-5/12 lg:w-3/12 w-10/12 border-r-1-2 p-3 text-white overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${cardData.flier})` }}
    >
      <div className="absolute left-0 bottom-0 opacity-[80%] bg-black h-40 md:h[250px] w-full items-center">
        <div className="flex flex-col p-3 md:p-5 font-mono justify-items-start ">
          <h5>{cardData.eventName}</h5>
          <p>{cardData.recurring && cardData.description}</p>
          <div className="flex flex-wrap gap-2 items-center">
            <h4>{cardData.time}</h4>
            <p>{!cardData.recurring && cardData.date}</p>
          </div>
          {!cardData.recurring && <p>Countdown</p>}
          {cardData.regLink && (
            <Link href={cardData.regLink}>Register here</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCardLayout;
