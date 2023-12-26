"use client";

import { useEffect, useState } from "react";
import countdownTimer from "@/utilities/countdownTimer";
import getNextSunday from "@/utilities/getNextSunday";
import LocationRestrictedPage from "./LocationRestrictedPage";

const TimerOrButton = () => {
  const [timeRemaining, setTimeRemaining] = useState(
    countdownTimer(getNextSunday())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = countdownTimer(getNextSunday());
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const renderCountdown = () => {
    if (timeRemaining.total > 0) {
      return (
        <>
          <div className="flex flex-col justify-center items-center my-10">
            <p className="my-5 font-bold text-xl lg:text-2xl">
              Workers Sunday Meeting Attendance
            </p>
            <p className=" text-sky-800 p-2">
              Workers Meeting Starts 7am through 8am Every Sunday. Attendance is opened only during this period
            </p>
            <div>
              <p className="font-bold text-[#0e0e33] text-xl lg:text-4xl">
                {`${formatTime(timeRemaining.days)}d ${formatTime(
                  timeRemaining.hours
                )}h ${formatTime(timeRemaining.minutes)}m ${formatTime(
                  timeRemaining.seconds
                )}s`}
              </p>
            </div>
            <p>Countdown to the next Workers Meeting</p>
          </div>
        </>
      );
    } else if (
      timeRemaining.total <= 0 &&
      timeRemaining.total < getNextSunday().setHours(8, 0, 0, 0)  //attendance page should be left active till 8am on sunday
    ) {
      return (
       <LocationRestrictedPage />
      );
    }
  };

  return <>{renderCountdown()}</>;
};

export default TimerOrButton;
