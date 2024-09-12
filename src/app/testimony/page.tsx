import Header from '@/components/UILayouts/Header'
import React from 'react'
import TestimonyForm from '@/components/UILayouts/TestimonyForm'
import TestimonyImage from "../../../public/headers/testimony.jpg"


const Page = () => {
  return (
    <div className='bg-[#D9D9D9] flex flex-col items-center gap-3'>
        <Header imageUrl={TestimonyImage.src} title='Share Your Testimony With Us'/>
        {/* content */}
        <div className='p-5'>
            <h3 className='font-bold text-xl'>The Lord is Good and His mercies Endure forever</h3>
            <p className='text-blue-950'>Kindly fill the form below to share with us what God has done for you</p>
        </div>
        {/* Testimony Form */}
        <div>
            <TestimonyForm/>
        </div>
    </div>
  )
}

export default Page