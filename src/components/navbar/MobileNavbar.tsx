"use client";

import Link from "next/link";
import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { HiMenuAlt3 } from "react-icons/hi";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setMenuOpen(!menuOpen)}>
        {!menuOpen ? <GrMenu size={30} /> : <HiMenuAlt3 size={30} />}
      </div>
      <div>
        {menuOpen && (
          <div className="mobile-navbar">
            <ul>
              <p>Links</p>
              <li>
                <Link href={`/`}>Home</Link>
              </li>
              <li>
                <Link href={`/`}>About Us</Link>
              </li>
              <li>
                <Link href={`/`}>Contact Us</Link>
              </li>
              <li>
                <Link href={`/`}>Workers Forum</Link>
              </li>
              <li>
                <Link href={`/`}>Our Messages</Link>
              </li>
              <li>
                <Link href={`/`}>Online Giving</Link>
              </li>
              <li>
                <Link href={`/`}>Online Giving</Link>
              </li>
            </ul>
            {/* Natural Groups and Ministries */}
            <ul>
              <li>
                <Link href={``}>Excellent Men</Link>
              </li>
              <li>
                <Link href={``}>Good Women</Link>
              </li>
              <li>
                <Link href={``}>Ablaze Youth</Link>
              </li>
              <li>
                <Link href={``}>Teens Ministry</Link>
              </li>
              <li>
                <Link href={``}>Children Ministry</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
