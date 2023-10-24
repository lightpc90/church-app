import React from "react";
import Link from "next/link";

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
              <li>
                <Link href='/'>Gallery</Link>
              </li>
              <li>
                <Link href='/'>Upcoming Events</Link>
              </li>
              <li>
                <Link href='/'>Watch Us Live</Link>
              </li>
              <li>
                <Link href='/'>Sermons</Link>
              </li>
              <li>
                <Link href='/'>Youtube</Link>
              </li>
              <li>
                <Link href='/'>Facebook</Link>
              </li>
              <li>
                <Link href='/'>Instagram</Link>
              </li>
            </ul>
          </div>

          {/* links at the right  */}
          <div>
            <ul className="flex flex-col gap-2 md:gap-8">
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/'>Contact</Link>
              </li>
              <li>
                <Link href='/'>About</Link>
              </li>
              <li>
                <Link href='/'>Testimonies</Link>
              </li>
              <li>
                <Link href='/'>Blog</Link>
              </li>
              <li>
                <Link href='/'>Devotions</Link>
              </li>
              <li>
                <Link href='/'>Prayer Request</Link>
              </li>
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
