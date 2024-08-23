import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex gap-2 items-center'>
        <div className='w-[60px] h-[60px] rounded-full flex items-center justify-center overflow-hidden'>
          <Image src={`/rrcg-mylogo.png`} alt='logo' width={900} height={900} priority className=' w-full h-full object-cover p-0' />
        </div>
        <p className='font-bold'>RCCG Beautiful Gate</p>
    </div>
  )
}

export default Logo