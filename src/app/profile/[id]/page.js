'use client'

import React from 'react'
import Info from '@/components/user/Info';
import Footer from '@/components/Footer';
import AvatarImage from '@/components/avatarImage';


const Page = () => {

  const info = Info()
  const avatar = AvatarImage("")
 
  return (
    <>
      <div className="flex flex-col mt-[80px] min-h-[400px] justify-center p-5 bg-slate-500">
        <div className="text-right font-semibold">Hi, Gideon</div>
        <div className='flex justify-end'>
          <button className="font-semibold text-sm bg-slate-950 text-white py-1 px-2 w-4/12 md:w-2/12 lg:w-[120px]  ">
            Update Profile
          </button>
        </div>

        <div>{avatar}</div>
        {/* Basic Info component */}
        {info}
      </div>
      ;
      <Footer />
    </>
  );
}

export default Page