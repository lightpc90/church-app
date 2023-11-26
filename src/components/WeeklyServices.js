import React from 'react'

const WeeklyServices = () => {
  return (
    <div className="flex flex-wrap justify-center content-center items-center gap-3 lg:gap-10 my-9">
      <div>
        <h6 className="w-screen text-center text-[#808081]">
          Fellowship With Us
        </h6>
        <h1 className="w-screen text-center text-2xl font-bold">
          Our Weekly Services
        </h1>
      </div>

      {/* Sunday service container */}
      <div
        className="flex flex-col py-10 h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/sunday_worship.jpg')" }}
      >
        <h1 className="text-2xl font-bold font-mono">SUNDAY SERVICE</h1>
        <div className="flex flex-col font-bold">
          <h1 className="text-xl font-mono">
            1st Service: <span className="text-[yellow]">7:45am</span>
          </h1>
          <h1 className="text-xl font-mono">
            2nd Service: <span className="text-[yellow]">9:45am</span>
          </h1>
        </div>
      </div>

      <div
        className="h-80 md:h-[500px] md:w-5/12 w-10/12 border-r-1-2 p-5  text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/word.jpg')" }}
      >
        <h1 className="text-2xl font-bold font-mono">DIGGING DEEP</h1>
        <div className="flex flex-col font-bold md:gap-6">
          <h1 className="text-xl font-mono">
            Every Tuesday: <span className="text-[yellow]">6pm</span>
          </h1>
        </div>
      </div>
      <div
        className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/man_praying.jpg')" }}
      >
        <h1 className="text-2xl font-bold font-mono">FAITH CLINIC</h1>
        <div className="flex flex-col font-bold md:gap-6">
          <h1 className="text-xl font-mono">
            Every Thursday: <span className="text-[yellow]">6pm</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default WeeklyServices