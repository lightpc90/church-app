import Image from "next/image";
import React from "react";

const WeeklyServiceLayout = ({ program }) => {
  return (
    <div
      className={`bg-slate-600 text-white w-[300px] h-[200px] z-30 relative`}
    >
      <Image
        src={program.image}
        alt=""
        height={500}
        width={400}
        loading="eager"
        className="object-cover object-center h-full w-full"
      />
      <div
        className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
      >
        <h3>{program.day}</h3>
        <div>
          {program.day === "SUN" ? (
            <>
              {/* early risers */}
              <h4 className="bg-rose-800 px-2 text-center">Two Services</h4>
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
            </>
          ) : (
            <>
              <div
                className={`bg-slate-900 absolute flex flex-col justify-between top-0 left-0 w-[50%] h-full opacity-70 p-2`}
              >
                <div>
                  <p>{program.service}</p>
                  <p className="text-slate-400 text-sm">{program.time}</p>
                  <p></p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeeklyServiceLayout;
