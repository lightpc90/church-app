'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SlArrowDown } from "react-icons/sl";
import { easeOut, motion, AnimatePresence } from "framer-motion";


const Navs = [
  { name: 'Home', link: '/' },
  { name: 'Online Church', link: '/online-church' },
  { name: 'Contact Us', link: '/contact-us' },
  { name: 'Giving & Partnership', link: '/online-giving' },
]

const buttonLinks = [
  { name: "How Can I Be Saved?", link: "/how-can-i-be-saved" },
  { name: "Prayer Request", link: "/prayer-request" },
  { name: "Share Testimony", link: "/testimony" },
  { name: "Workers", link: "/workers" },
  { name: "About Us", link: "/about-us" },
  { name: "House Fellowship Centers", link: "/house-fellowship-centers" },
  { name: "Natural Groups and Ministries", link: "/groups-and-ministries" },

]

const Links = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [showCard, setShowCard] = useState(false)
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      setShowCard(true);
    } else {
      // Delay hiding the card
      timeout = setTimeout(() => setShowCard(false), 700); // 700ms delay
    }
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [isHovered]);
  return (
    <div className='hidden lg:flex gap-5'>
      {Navs.map((navlink, i) => (
        <Link key={i} href={navlink.link} className='font-bold hover:text-rose-600'>{navlink.name}</Link>
      ))}
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='font-bold flex items-center gap-2 pb-4 relative'>
        <span>Links</span><span><SlArrowDown /></span>
        {showCard &&
          (<AnimatePresence>
            <motion.div
              key="mobbileNav"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: easeOut }}
              className='flex flex-col gap-3 w-[500px] px-3 py-6 rounded-md shadow-md bg-white text-blue-900 absolute top-[30px] translate-x-[50%]'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {buttonLinks.map((link, i) => (
                <Link className='text-start hover:bg-gray-200 p-2' href={link.link} key={i}>{link.name}</Link>
              ))}
            </motion.div>
          </AnimatePresence>
          )}
      </button>

    </div>
  );
}

export default Links