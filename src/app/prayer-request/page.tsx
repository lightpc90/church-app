import Header from "@/components/UILayouts/Header";
import React from "react";
import PrayerRequestForm from "@/components/UILayouts/PrayerRequestForm";
import { PrayerRequestPageIntro } from "@/components/data/Data";
import prayerImage from "../../../public/headers/prayer-request.png";

const Page = () => {
  return (
    <div className="bg-[#D9D9D9] flex flex-col w-full items-center">
      <Header
        imageUrl={prayerImage.src}
        title={PrayerRequestPageIntro.headerTitle}
      />
      {/* content body */}
      <div className="lg:w-[70%] flex flex-col items-center">
        <div className="p-5 lg:w-[50%] flex flex-col items-center">
          <h3 className="font-bold text-xl lg:text-3xl text-center">
            {PrayerRequestPageIntro.title}
          </h3>
          <p className="lg:text-xl mb-5 text-center text-blue-950">
            {PrayerRequestPageIntro.description}
          </p>
          <p className="lg:text-lg">{PrayerRequestPageIntro.body}</p>
          <p className="py-10 text-blue-950 lg:text-lg lg:font-bold lg:w-[70%] text-center">
            Kinldy fill the form below to submit your prayer request so that we
            can pray with you
          </p>
        </div>
        {/* Prayer request form */}

        <div className="w-full flex justify-center">
          <PrayerRequestForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
