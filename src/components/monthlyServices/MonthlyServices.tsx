import React from "react";
import Frame from "./Frame";
import FrameRight from "./FrameRight";
import thanksgiving from "../../../public/thanksgiving.png"
import goodmorningholyspirit from "../../../public/goodMorningHolySpirit.png"
import youthSunday from "../../../public/randomChurchPic.jpg";

const MonthlyServices = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center gap-5 py-10 overflow-hidden z-20">
      <h2 className="font-bold text-xl z-10">Our Monthly Programs</h2>
      {/* Good morning holy spirit */}
      <div className="flex items-center z-10">
        {/* frame */}
        <div className="flex-1">
          <Frame image={goodmorningholyspirit.src} />
        </div>
        <div className="flex-1 flex flex-col gap-1 w-[140px] text-center">
          <h5 className="font-bold">Good Morning Holy Spirit</h5>
          <p className="text-[#C3BF55] text-sm">Every 1st Day of the Month</p>
          <p className="text-sm">6am-7am</p>
        </div>
      </div>
      {/* Thanksgiving Sunday */}
      <div className="flex items-center z-10">
        <div className="flex-1 flex flex-col gap-1 w-[140px] text-center ">
          <h5 className="font-bold">Thanksgiving Sunday</h5>
          <p className="text-[#C3BF55] text-sm">
            Every 1st Sunday of the Month
          </p>
          <p className="text-sm">8am-11:30am</p>
        </div>
        {/* frame */}
        <div className="flex-1">
          <FrameRight image={thanksgiving.src} />
        </div>
      </div>
      {/* Youth sunday */}
      <div className="flex items-center z-10">
        {/* frame */}
        <div className="flex-1">
          <Frame image={youthSunday.src} />
        </div>
        <div className="flex-1 flex flex-col gap-1 w-[140px] text-center ">
          <h5 className="font-bold">Youth Sunday</h5>
          <p className="text-[#C3BF55] text-sm">
            Every 3rd Sunday of the Month
          </p>
          <p className="text-sm">10am (Second Service)</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyServices;
