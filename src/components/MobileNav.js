import React from 'react'

const MobileNav = () => {
  return (
    <div className='fixed top-[80px] left-0 flex flex-col bg-slate-950 text-white px-5 pt-5 w-screen min-h-screen z-50 overflow-auto'>
      <ul className='divide-y'>
        <li>Home</li>
        <li>My Profile</li>
        <li>About Us</li>
        <li>Events</li>
        <li>Blog</li>
        <li>Counselling</li>
        <li>Youth Forum</li>
    </ul>
    </div>
  );
}

export default MobileNav