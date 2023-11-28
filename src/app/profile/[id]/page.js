'use client'

import React from 'react'
import Info from '@/components/user/Info';
import Footer from '@/components/Footer';
import AvatarImage from '@/components/avatarImage';

import { useAuth } from '@/context/globalState';


const Page = () => {
  const { signOut } = useAuth()
  
  const info = Info()
  const avatar = AvatarImage("")
 
  return (
    <>
      <div className="flex flex-col mt-[80px] min-h-[400px] justify-center p-5 bg-slate-500">
        <div className="flex justify-end">
          <button className="font-semibold mt-5 text-sm bg-slate-950 text-white py-1 px-2 w-4/12 md:w-2/12 lg:w-[120px]  ">
            Edit Profile
          </button>
        </div>
        <div onClick={()=>{signOut()}} className="flex justify-end">
          <button className="font-semibold text-sm py-1 w-4/12 md:w-2/12 lg:w-[120px]  ">
            Logout
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