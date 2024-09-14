import Image from "next/image";
import React from "react";
import styles from "./weeklyService.module.css";

const WeeklyServices = () => {
  return (
    <div className="py-10 text-zinc-950 font-bold flex flex-col gap-5 items-center z-30">
      <div className="text-center z-30">
        <h4 className={`text-sm text-slate-500`}>Worship With Us</h4>
        <h2 className="text-xl">Our Weekly Services</h2>
      </div>
      <div className="flex flex-wrap w-full lg:w-[80%] gap-5 items-center justify-center">
        {/* sunday service */}
        <div
          className={`bg-slate-600 text-white w-[300px] h-[200px] z-30 relative`}
        >
          <Image
            src={`/guitar.jpg`}
            alt=""
            height={500}
            width={400}
            loading="eager"
            className="object-cover object-center h-full w-full"
          />
          <div
            className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
          >
            <h3>SUN.</h3>
            <div>
              <h4 className="bg-rose-800 px-2 text-center">Two Services</h4>
              {/* early risers */}
              <div>
                <p>Early Risers</p>
                <p className="text-slate-400 text-sm">8am-9:30am</p>
              </div>
              {/* family service */}
              <div>
                <p>Family Service</p>
                <p className="text-slate-400 text-sm">9:30am-11:30am</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        {/* Tuesday service */}
        <div
          className={`bg-slate-600 text-white w-[300px] h-[200px] z-30 relative`}
        >
          <Image
            src={`/guitar.jpg`}
            alt=""
            height={500}
            width={400}
            loading="eager"
            className="object-cover object-center h-full w-full"
          />
          <div
            className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
          >
            <h3>TUE.</h3>
            <div>
              <p>Digging Deep</p>
              <p className="text-slate-400 text-sm">6pm-7pm</p>
              <p></p>
            </div>
          </div>
        </div>
        {/* Thursday service */}
        <div
          className={`bg-slate-600 text-white w-[300px] h-[200px] z-30 relative`}
        >
          <Image
            src={`/guitar.jpg`}
            alt=""
            height={500}
            width={400}
            loading="eager"
            className="object-cover object-center h-full w-full"
          />
          <div
            className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
          >
            <h3>THUR.</h3>
            <div>
              <p>Faith Clinic</p>
              <p className="text-slate-400 text-sm">6pm-7pm</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyServices;
