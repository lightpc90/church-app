import Header from "@/components/UILayouts/Header";
import React from "react";
import headerImage from "../../../public/churchFront1.png";
import PastorLayout from "@/components/UILayouts/PastorLayout";
import pastorImage from "../../../public/default_dp.webp";
import { AboutUs } from "@/components/data/Data";

const page = () => {
  const pastorEgra = {
    name: "Pastor Egra Akpofure (PICP)",
    image: pastorImage.src,
  };
  const pastorDeji = {
    name: "Pastor Deji Adeniyi (APICP)",
    image: pastorImage.src,
  };
  const pastorOpasanya = {
    name: "Pastor Oluseye Opasanya",
    image: pastorImage.src,
  };

  const pastors = [
    {
      name: "Pastor Egra Akpofure (PICP)",
      image: pastorImage.src,
    },
    {
      name: "Pastor Deji Adeniyi (APICP)",
      image: pastorImage.src,
    },
    {
      name: "Pastor Oluseye Opasanya",
      image: pastorImage.src,
    },
  ];
  return (
    <div className="bg-[#D9D9D9]">
      <Header title="About Us" imageUrl={headerImage.src} />
      {/* about us */}
      <div className="py-10 px-5 flex flex-col items-center">
        <div className="lg:w-[700px] mb-10">
          <h2 className="font-bold text-xl mb-3 text-center w-full">
            {AboutUs.title}
          </h2>
          <p className="text-lg">

          {AboutUs.body}
          </p>
        </div>

        {/* pastors */}
        <div className="my-10 w-full flex flex-col items-center">
          <h3 className="font-bold text-center my-2 lg:my-10">Meet Our Pastors</h3>
          <div className="flex flex-wrap gap-3 items-center justify-center lg:w-[70%]">
            {pastors.map((pastor, i) => (
              <PastorLayout key={i} pastorData={pastor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
