import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-2 items-center md:text-2xl'>
        <div className='w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden'>
          <Image src={`/logo/rccg_logo.png`} alt='logo' width={600} height={600} priority className=' w-full h-full object-cover p-0' />
        </div>
        <p className='font-bold'>RCCG Beautiful Gate</p>
    </div>
  )
}

export default Logo