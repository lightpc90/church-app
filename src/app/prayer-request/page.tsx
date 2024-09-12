import Header from "@/components/UILayouts/Header";
import React from "react";
import PrayerRequestForm from "@/components/UILayouts/PrayerRequestForm";
import { PrayerRequestPageIntro } from "@/components/data/Data";
import prayerImage from "../../../public/headers/prayer-request.png"

const Page = () => {
  return (
    <div className="bg-[#D9D9D9] flex flex-col w-full items-center">
      <Header
        imageUrl={prayerImage.src}
        title={PrayerRequestPageIntro.headerTitle}
      />
      {/* content body */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-center">
          {PrayerRequestPageIntro.title}
        </h3>
        <p className="mb-5 text-center text-blue-950">
          {PrayerRequestPageIntro.description}
        </p>
        <p>{PrayerRequestPageIntro.body}</p>
        <p className="py-10 text-blue-950">
          Kinldy fill the form below to submit your prayer request so that we
          can pray with you
        </p>
      </div>
      {/* Prayer request form */}

      <div>
        <PrayerRequestForm />
      </div>
    </div>
  );
};

export default Page;
