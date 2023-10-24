'use client'
import countdownTimer from "@/utilities/countdownTimer";

import { useEffect, useState } from "react"

const TimerOrButton = () => {
   
    const [timeRemaining, setTimeRemaining] = useState(
      countdownTimer()
    );
    
    useEffect(() => {
      const timer = setInterval(() => {
        const remaining = countdownTimer();
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
    return time.toString().padStart(2, '0');
  };
  
   const renderCountdown = () => {
    if (timeRemaining.total > 0) {
      return (
        <>
          <div className="flex flex-col justify-center items-center my-10">
            <p className="my-10 text-[#3838ce]">Check back to mark your attendance</p>
            <div>
              <p className="font-bold text-[#0e0e33] text-xl md:text-2xl">
                {`${formatTime(timeRemaining.days)}d ${formatTime(
                  timeRemaining.hours
                )}h ${formatTime(timeRemaining.minutes)}m ${formatTime(
                  timeRemaining.seconds
                )}s`}
              </p>
            </div>
            <p>Countdown to the next Sunday Service</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p>Workers Attendance!</p>
          <button>Register</button>
        </>
      );
    }
  }
  
  return <>{renderCountdown()}</>;


}

export default TimerOrButton