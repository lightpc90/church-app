import Header from '@/components/UILayouts/Header'
import React from 'react'
import headerImage from "../../../public/headers/Ch6.jpg"
import PastorLayout from '@/components/UILayouts/PastorLayout';
import pastorImage from "../../../public/default_dp.webp"
import { AboutUs } from '@/components/data/Data';

const page = () => {
  const pastorEgra = {
    name: "Pastor Egra Akpofure (PICP)",
    image: pastorImage.src,
  }
    const pastorDeji = {
      name: "Pastor Deji Adeniyi (APICP)",
      image: pastorImage.src,
    };
    const pastorOpasanya = {
      name: "Pastor Oluseye Opasanya",
      image: pastorImage.src,
    };
  return (
    <div className='bg-[#D9D9D9]'>
      <Header title="About Us" imageUrl={headerImage.src} />
      {/* about us */}
      <div className='py-10 px-5'>
        <div className="lg:w-[30%] mb-10">
          <h2 className="font-bold text-lg mb-3 text-center w-full">{AboutUs.title}</h2>
         {AboutUs.body}
        </div>

        {/* pastors */}
        <div className='my-10'>
          <h3 className='font-bold text-center my-2'>Meet Our Pastors</h3>
          <div className='flex flex-col gap-3 items-center'>
            <PastorLayout pastorData={pastorEgra}/>
            <PastorLayout pastorData={pastorDeji}/>
            <PastorLayout pastorData={pastorOpasanya}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page