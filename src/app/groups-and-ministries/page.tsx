import React from "react";
import Header from "@/components/UILayouts/Header";
import { NaturalGroups, Ministries } from "@/components/data/Data";
import GroupLayout from "@/components/UILayouts/GroupLayout";
import headerImage from "../../../public/headers/neo-light.jpg";

const Page = () => {
  const title = "Our Natural Groups and Ministries";
  return (
    <div className="bg-[#D9D9D9] pb-10 flex flex-col items-center">
      <Header title={title} imageUrl={headerImage.src} />
      {/* Content */}
      <div className="py-10 space-y-8 lg:w-[50%] flex flex-col items-center">
        {/* Natural groups */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Our Natural Groups
          </h2>
          <div className="flex flex-col gap-2 w-full items-center">
            {NaturalGroups.map((group, i) => (
              <GroupLayout key={i} group={group} />
            ))}
          </div>
        </div>
        {/* Ministries */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-4">
            Our Ministries
          </h2>
          <div className="flex flex-col gap-2 w-full items-center">
            {Ministries.map((ministry, i) => (
              <GroupLayout key={i} group={ministry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
