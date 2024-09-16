import React from 'react'
import Header from '@/components/UILayouts/Header'
import HeaderImage from "../../../public/headers/house-fellowship.jpg"

const Page = () => {
  return (
    <div className='bg-[#D9D9D9]'>
        <Header title='' imageUrl={HeaderImage.src}/>
    </div>
  )
}

export default Page