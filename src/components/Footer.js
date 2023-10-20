import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        className={
          "flex flex-col justify-between min-h-[660px] md:min-h-[1200px] py-10 px-5 bg-slate-900 text-white font-sans text-xl content-center"
        }
      >
        <div>
          <h3 className="font-bold text-center text-[#d4d49ad2]">
            RCCG Beautiful Gate, Lakowe
          </h3>
        </div>
        {/* links container */}
        <div className="flex justify-evenly md:justify-center md:gap-20 md:my-20">
          {/* links at the left */}
          <div>
            <ul className="flex flex-col gap-2 md:gap-8">
              <li>Media</li>
              <li>Upcoming</li>
              <li>Watch Us Live</li>
              <li>Sermons</li>
              <li>Youtube</li>
              <li>Facebook</li>
            </ul>
          </div>

          {/* links at the right  */}
          <div>
            <ul className="flex flex-col gap-2 md:gap-8">
              <li>Home</li>
              <li>Contact</li>
              <li>About</li>
              <li>Testimonies</li>
              <li>Blog</li>
              <li>Devotions</li>
              <li>Events</li>
            </ul>
          </div>
        </div>
        {/* copyright container */}
        <div className="flex justify-center">
          RCCG Beautiful Gate 2023. All right reserved. Developed by Folahan
          Abbey
        </div>
      </div>
    </footer>
  );
};

export default Footer;
