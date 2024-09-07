import Image from 'next/image'
import React from 'react'

const weeklyServiceLayout = ({program}) => {
  return (
    <div className='h-[200px] w-[300px] bg-slate-400 relative'>
        <Image src={``} alt='' height={400} width={400} className='bg-cover bg-center' />
    <div>
        <h1>{program.day}</h1>
        
    </div>
    </div>
  )
}

export default weeklyServiceLayout