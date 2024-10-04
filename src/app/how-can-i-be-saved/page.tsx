import React from 'react'
import Header from '@/components/UILayouts/Header'
import { HowCanIBeSavedData } from '@/components/data/Data';
import NewConvertForm from '@/components/UILayouts/New-convert-form';
import headerImage from "../../../public/salvation.jpg"

const Page = () => {
  const title = "While we were yet sinners, Christ died for us";
  return (
    <div className="bg-[#D9D9D9] pb-10 flex flex-col items-center">
      <Header title={title} imageUrl={headerImage.src} />
      {/* Content */}
      <div className="p-5 mt-5 lg:w-[50%] flex flex-col text-center justify-center">
        <h2 className="font-bold text-xl lg:text-2xl">{HowCanIBeSavedData.title}</h2>
        <p className="py-3 lg:text-xl">{HowCanIBeSavedData.body}</p>
        <p className='font-bold text-center text-blue-950 mt-10 lg:text-lg'>
          Kindly fill the form bellow so that Our Follow-Up team can reach out
          to you
        </p>
      </div>
      {/* follow-up form */}
      <div className='w-full flex justify-center'>
        <NewConvertForm />
      </div>
    </div>
  );
}

export default Page