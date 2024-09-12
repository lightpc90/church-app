import Header from "@/components/UILayouts/Header";
import React from "react";
import PrayerRequestForm from "@/components/UILayouts/PrayerRequestForm";
import { PrayerRequestPageIntro } from "@/components/data/Data";

const Page = () => {
  return (
    <div>
      <Header imageUrl="" title={PrayerRequestPageIntro.headerTitle} />
      {/* content body */}
      <div>
        <h3>{PrayerRequestPageIntro.title}</h3>
        <p>{PrayerRequestPageIntro.description}</p>
        <p>{PrayerRequestPageIntro.body}</p>
      </div>
      {/* Prayer request form */}
      <div>
        <PrayerRequestForm />
      </div>
    </div>
  );
};

export default Page;
