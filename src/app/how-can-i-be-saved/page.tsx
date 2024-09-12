import React from 'react'
import Header from '@/components/UILayouts/Header'
import { HowCanIBeSavedData } from '@/components/data/Data';
import NewConvertForm from '@/components/UILayouts/New-convert-form';
import headerImage from "../../../public/headers/salvation.png"

const Page = () => {
  const title = "The Love of God is without Repentance";
  return (
    <div className="bg-[#D9D9D9] pb-10">
      <Header title={title} imageUrl={headerImage.src} />
      {/* Content */}
      <div className="p-5 mt-5">
        <h2 className="font-bold text-xl">{HowCanIBeSavedData.title}</h2>
        <p className="py-3">{HowCanIBeSavedData.body}</p>
        <p className='font-bold text-center text-blue-950'>
          Kindly fill the form bellow so that Our Follow-Up team can reach out
          to you
        </p>
      </div>
      {/* follow-up form */}

      <div>
        <NewConvertForm />
      </div>
    </div>
  );
}

export default Page