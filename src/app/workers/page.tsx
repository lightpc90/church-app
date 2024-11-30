'use client'

import { useState } from 'react'
import { FiSettings } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { SiHomebridge } from "react-icons/si";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import Link from 'next/link';

const Page = () => {
  const [show, setShow] = useState(false)
  return (
    <div className='h-[100dvh] w-[100vw] overflow-hidden bg-gradient-to-tr from-blue-300 via-blue-200 to-rose-300'>
      <div className='h-[60px] w-full text-white bg-blue-950 p-2 flex items-center justify-center'> This page is still being developed</div>
      <div className=' bg-blue-300 text-lg font-bold p-4 flex items-center justify-between'>
        <span>

          Workers Dashboard
        </span>
        <Link href={`/`} className='text-blue-950 hover:text-blue-800 font-bold p-2 flex items-center gap-2'><span><SiHomebridge size={25} /></span><span className='text-sm'>Home</span></Link>
      </div>
      <div className='p-4 space-y-2'>
        {/* dp */}
        <div>
          <div className='h-[90px] w-[90px] rounded-full bg-blue-950 flex items-center justify-center'>
            <RxAvatar size={80} className='text-white' />
          </div>
          <p className='font-bold text-lg py-2'>Hi, John</p>
        </div>
        <Link href={`/workers/mark-attendance`} className='bg-blue-950 hover:bg-blue-800 text-white p-3 rounded-md'>Mark attendance</Link>
      </div>
      <div className='p-4 space-y-2 max-w-[600px]'>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Full Name:</span> <span className='font-bold'>John Doe</span></div>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Primary Dept:</span> <span className='font-bold'>Media and Technical</span></div>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Phone Number:</span> <span className='font-bold'>08123456789</span></div>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Email:</span> <span className='font-bold'>john.doe@me.com</span></div>
      </div>
      {/* divider */}
      <div className='h-[5px] w-[50%] bg-blue-950 max-w-[300px]' ></div>
      {/* secondary info */}
      <div className='p-4 space-y-2 max-w-[600px]'>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>House Fellowship:</span> <span className='font-bold'></span></div>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Residential Address</span> <span className='font-bold'></span></div>
        <div className='bg-gray-200 p-3 rounded-md ring-1 shadow-md ring-blue-800'><span>Secondary Depts:</span> <span className='font-bold'></span></div>
      </div>
      {/* divider */}
      <div className='h-[5px] w-[50%] max-w-[300px] bg-blue-950' ></div>
      {/* settings */}
      <div className='absolute bottom-[1px] left-[10px]'>
        {show && <div className='p-3 bg-blue-950 rounded-md absolute bottom-[100%] left-[5px] shadow-md w-fit'>
          <div className='text-white font-bold p-2'>Settings</div>
          <Link href={`/`} onClick={() => setShow(false)} className='text-white hover:text-blue-600 font-bold p-2 flex items-center gap-2'><span><SiHomebridge size={25} /></span><span className='text-sm'>Home</span></Link>
          <button className='text-white hover:text-blue-600 font-bold p-2 flex items-center gap-2 w-fit'><span><FaRegEdit size={25} /></span><span className='text-sm'>Edit Profile</span></button>
          <button className='text-white hover:text-blue-600 font-bold p-2 flex items-center gap-2'><span><RiLogoutCircleLine size={25} /></span><span className='text-sm'>LogOut</span></button>
        </div>}
        <div onClick={() => setShow(!show)} className='flex items-center justify-center h-[40px] w-[40px] bg-blue-950 hover:bg-blue-800 m-4 rounded-full  shadow-md'>
          <span className='text-white'>
            <FiSettings size={25} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Page