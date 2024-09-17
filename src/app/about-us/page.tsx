import Header from '@/components/UILayouts/Header'
import React from 'react'
import headerImage from "../../../public/headers/Ch6.jpg"
import PastorLayout from '@/components/UILayouts/PastorLayout';
import pastorImage from "../../../public/default_dp.webp"

const page = () => {
  const pastorEgra = {
    name: "Pastor Egra Akpofure (PICP)",
    image: pastorImage.src,
  }
  return (
    <div className='bg-[#D9D9D9]'>
      <Header title="About Us" imageUrl={headerImage.src} />
      {/* about us */}
      <div className='py-10 px-5'>
        <div className="lg:w-[30%] mb-10">
          <h2 className="font-bold text-lg mb-3 text-centre">About Us</h2>
          RCCG Beautiful Gate Lakowe, we are a branch of Redeemed Christian
          Church of God, Lagos Province 114, Zone 5, located at Lakowe.
          We&apos;re a diverse and welcoming community devoted to faith,
          fellowship, and love. Our vibrant worship services, engaging programs,
          and outreach initiatives are designed to nurture spiritual growth and
          foster connections with God and fellow believers. With a commitment to
          inclusivity, we embrace everyone, encouraging a deeper relationship
          with God and a sense of belonging. Join us on this journey of faith,
          love, and grace.
        </div>

        {/* pastors */}
        <div>
          <h3 className='font-bold text-center'>Meet Our Pastors</h3>
          <div>
            <PastorLayout pastorData={pastorEgra}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page