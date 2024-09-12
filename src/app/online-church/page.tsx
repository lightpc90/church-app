import LiveProgram from "@/components/livestream/LiveProgram";
import Header from "@/components/UILayouts/Header";
import React from "react";

const page = () => {
  return (
    <div>
      <Header title={""} imageUrl="" />
      <LiveProgram />
      {/* Audio and Video Messages */}
      <div>
        {/* Audio  Messages */}
        <div>
          <h2>Our Audio Messages</h2>
          <div className="w-[90%] rounded-full">
            <input
              type="text"
              placeholder="Search Audio Messages"
              className="w-[90%] px-5"
            />
            {/* search icon */}
          </div>
          {/* list of Audios */}
          <div>
            <ul>
              <li className="w-full"></li>
              <li className="w-full"></li>
              <li className="w-full"></li>
            </ul>
          </div>
        </div>
        {/*  Video Messages */}
        <div>
          <h2>Our Video Messages</h2>
          <div className="w-[90%] rounded-full">
            <input
              type="text"
              placeholder="Search Video Messages"
              className="w-[90%] px-5"
            />
            {/* search icon */}
          </div>
          {/* video iFrame */}
          <div className="w-[90%] h-[300px]"></div>
          {/* list of Videos */}
          <div>
            <ul>
              <li className="w-full"></li>
              <li className="w-full"></li>
              <li className="w-full"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
