import React from 'react'
import Footer from '@/components/Footer';
import { aboutUsWelcome, churchAddress } from '@/data';
import Image from 'next/image';
import RenderPastors from '@/components/renderPastors';

export const metadata = {
  title: "About Us",
  description: "Know about our church",
};


const Page = () => {
  const welcome = aboutUsWelcome()
  const _churchAddress = churchAddress()

  return (
    <>
      <div className="mt-[80px] min-h-[400px] p-5 flex flex-col justify-center items-center">
        <h6 className=" text-center text-[#808081]">Get to Know Us</h6>
        <h4 className="pb-5">About Us</h4>

        {/* church image here */}
        {/* <Image />
         */}

        <div>
          <p className="md:px-[700px]">{welcome}</p>
          <h6 className="text-center mt-5">Our Address</h6>
          <p className="md:px-[700px]">{_churchAddress}</p>
          <h6 className="text-center mt-5 py-2">Meet Our Pastors</h6>
          <div className="flex flex-wrap justify-center ">
           <RenderPastors/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page