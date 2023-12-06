import React from 'react'
import Footer from '@/components/Footer';
import { aboutUsWelcome, ChurchAddress } from '@/data';
import Image from 'next/image';
import RenderPastors from '@/components/renderPastors';

export const metadata = {
  title: "About Us",
  description: "Know about our church",
};


const Page = () => {
  const welcome = aboutUsWelcome()

  return (
    <>
      <div className="mt-[80px] min-h-[400px] p-5 flex flex-col justify-center items-center">
        <h6 className=" text-center text-[#808081]">Get to Know Us</h6>
        <h4 className="pb-5">About Us</h4>

        {/* church image here */}
        {/* <Image />
         */}

        <div>
          <p className="bg-slate-900 rounded-md text-white lg:mx-auto p-3 lg:px-[700px]">{welcome}</p>
          <h6 className="text-center mt-5">Our Address</h6>
          <p className="lg:px-[700px]">
            <ChurchAddress/>
          </p>
          <h6 className="text-center mt-5 py-2">Meet Our Pastors</h6>
          <div className='lg:px-[700px]'>
         <RenderPastors/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page