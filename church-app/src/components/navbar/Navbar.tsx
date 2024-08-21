import React from 'react'
import Logo from './Logo'
import Links from './Links'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 py-2 lg:px-20 flex items-center w-full justify-between z-30 '>
        <Logo/>
        <Links/>
        <div className='flex gap-3 items-center '>
            {/*login*/}
            <Link href={'/loginPage'} className='font-bold bg-slate-300 p-2 rounded-md'>login</Link>
            {/* profile picture wrapper */}
            <div className='h-[40px] w-[40px] bg-white rounded-full'></div>
        </div>
    </div>
  )
}

export default Navbar