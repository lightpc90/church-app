import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-between relative'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-slate-950 via-slate-700 opacity-90 '></div>
        <div className='text-white'>
            <span></span>
            <span>Back</span>
        </div>
        <div>
            <h3 className='text-white'>RCCG Beautiful Gate, Lakowe</h3>
            <p className='text-white'>Workers&apos; space</p>
            <button className='p-2 bg-white text-slate-950 font-bold rounded-md'></button>
            <div className='flex gap-2 items-center'>
            <p>Already have an account?</p>
            <Link href={``}>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Page