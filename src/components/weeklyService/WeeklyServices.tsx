import Image from "next/image";
import React from "react";
import styles from "./weeklyService.module.css";
import diggingDeep from "../../../public/digging deep.jpg"
import faithClinic from "../../../public/faith clinic.png"

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
          className={`bg-slate-600 text-white w-[96%] lg:w-[600px] h-[500px] lg:h-[400px] z-30 relative`}
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
            <h3>SUNDAY</h3>
            <div>
              <h4 className="text-yellow-600 font-bold text-xl">2 Services</h4>
              {/* early risers */}
              <div>
                <p>Early Risers</p>
                <p className="text-slate-400 text-sm">8am-9:30am</p>
              </div>
              {/* family service */}
              <div>
                <p>Family Service</p>
                <p className="text-slate-400 text-sm">10:00am-11:30am</p>
              </div>
              <div className="my-4 border"></div>
              {/* Sunday School */}
              <div className="my-2">
                <p>Sunday School</p>
                <p className="text-slate-400 text-sm">9:30am-10:00am</p>
                <p className="text-yellow-600 text-sm">
                  (8am-8:45am on Thanksgiving Sundays)
                </p>
              </div>
              {/* House Fellowship */}
              <div>
                <p>House Fellowship</p>
                <p className="text-slate-400 text-sm">5:00pm-6:00pm</p>
              </div>
            </div>
          </div>
        </div>
        {/* Tuesday service */}
        <div
          className={`bg-slate-600 text-white w-[300px] h-[200px] z-30 relative`}
        >
          <Image
            src={diggingDeep.src}
            alt=""
            height={500}
            width={400}
            loading="eager"
            className="object-cover object-center h-full w-full"
          />
          <div
            className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
          >
            <h3>TUESDAY</h3>
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
            src={faithClinic.src}
            alt=""
            height={500}
            width={400}
            loading="eager"
            className="object-cover object-center h-full w-full"
          />
          <div
            className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
          >
            <h3>THURSDAY</h3>
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
