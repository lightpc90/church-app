import React from 'react'

const SpecialServices = () => {
  return (
    <>
      {/* YOUTH SUNDAY CARD */}
      <div
        className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/youth_sunday.jpg')" }}
      >
        <div className="flex flex-col gap-5 md:p-10 font-mono">
          <h3>YOUTH SUNDAY EVERY 3RD SUNDAY OF THE MONTH</h3>
          <h4>SECOND SERVICE</h4>
        </div>
      </div>

      {/* GOOD MORNING HOLY SPIRIT CARD */}
      <div
        className="h-80 md:h-[500px] md:w-5/12 w-10/12 border-r-1-2 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/good_morning_holy_spirit1.jpg')" }}
      >
        <div className="flex flex-col gap-5 md:p-10 font-mono">
          <h3>GOOD MORNIG HOLY SPIRIT EVERY 1ST DAY OF THE MONTH</h3>
          <h4>6AM</h4>
        </div>
      </div>

      {/* HOLY COMMUNION SERVICE CARD */}
      <div
        className="h-80 md:h-[500px] md:w-5/12 w-10/12 p-5 text-white text-center overflow-hidden shadow-md rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/holy_communion_bg.jpg')" }}
      >
        <div className="flex flex-col gap-5 md:p-10 font-mono">
          <h3>HOLY COMMUNION SERVICE EVERY 1ST SUNDAY OF THE MONTH</h3>
          <h4>4PM</h4>
        </div>
      </div>
    </>
  );
}

export default SpecialServices