import React from 'react'
import Footer from '@/components/Footer';
import { ChurchAddress } from '@/data';
import TestimonyForm from '@/components/TestimonyForm';
import PrayerRequestForm from '@/components/PrayerRequestForm';

export const metadata = {
  title: "Contact Us",
  description: "Website contact us page: get church information here",
};


const Page = () => {
  return (
    <div className="mt-[80px] min-h-[400px]">
      {/* Header Image coming here */}
      <div className="p-5 flex flex-col justify-center items-center">
        <h6 className="text-center text-[#808081]">
          Have questions or want to connect with us?
        </h6>
        <h4>Contact Us</h4>
        <div className="px-5 my-5  lg:px-[600px]">
          <h6>We&#39;re here to help!</h6>
          <p>Feel free to reach out through the following options:</p>
          <ChurchAddress />
          <p className="mt-5">
            Our friendly team is available to assist you with any inquiries,
            event information, or spiritual guidance you may need. We look
            forward to hearing from you and welcoming you into our community.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-5 justify-center">
          <div id='testimony'>
            <h6 className="text-[#808081] text-center">
              You have a Testimony you want to share with us?
            </h6>
            <h6 className="text-center">Share Your Testimony</h6>
            <TestimonyForm />
          </div>

          <div id='prayer-request'> 
            <h6 className="text-[#808081] text-center">
              You have a Prayer Request you want us to pray with you?
            </h6>
            <h6 className="text-center">Share Your Prayer Request</h6>
            <PrayerRequestForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page