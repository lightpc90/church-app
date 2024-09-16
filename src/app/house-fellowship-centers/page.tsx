import React from "react";
import Header from "@/components/UILayouts/Header";
import HeaderImage from "../../../public/headers/house-fellowship.jpg";
import { HouseFellowshipCentersData } from "@/components/data/Data";
import { FiSearch } from "react-icons/fi";

const Page = () => {
  const lakoweZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Lakowe Zone"
  );
  const eputuZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Eputu Zone"
  );
  const bogijeZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Bogije Zone"
  );
  return (
    <div className="bg-[#D9D9D9]">
      <Header title="House Fellowship Centers" imageUrl={HeaderImage.src} />
      {/* content */}
      <div className="p-5">
        {/* title */}
        <div className="py-5">
          <h3 className="font-bold text-lg">
            We have our house fellowship meeting every Sunday by 5pm
          </h3>
          <p className="text-rose-800">
            Join a house fellowship center closest to you. It is always a time
            of worship, teaching, and fellowship
          </p>
        </div>
        {/* search bar */}
        <div className="flex bg-[#FDF9F9] rounded-full my-5 relative overflow-hidden">
          <input
            type="text"
            placeholder="Search House Fellowship Centers"
            className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
          />
          {/* search icon */}
          <span className="absolute top-[50%] right-2 translate-y-[-50%] ">
            <FiSearch size={25} />
          </span>
        </div>
        <div>
          <p>Below is the list of house fellowship centers and contacts</p>
          {/* house fellowship centers */}
          <div className="flex flex-col gap-10 ">
            <div className="my-5">
              <h3 className="font-bold text-xl">Lakowe Zone</h3>
              <div>
                {lakoweZone.map((center, i) => (
                  <div className="my-2" key={i}>
                    {/* center */}
                    <h4 className="font-bold text-rose-800">{`${center.center} Center`}</h4>
                    {/* host */}
                    <div>
                      <label className="font-bold">{`Host: `}</label>
                      <label>{center.host}</label>||
                      <label>{center.host_phone}</label>
                    </div>
                    {/* teacher */}
                    <div>
                      <label className="font-bold">{`Teacher: `}</label>
                      <label>{center.teacher}</label>||
                      <label>{center.teacher_phone}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Eputu Zone */}
            <div>
              <h3 className="font-bold text-xl">Eputu Zone</h3>
              <div>
                {eputuZone.map((center, i) => (
                  <div className="my-2" key={i}>
                    {/* center */}
                    <h4 className="font-bold text-rose-800">{`${center.center} Center`}</h4>
                    {/* host */}
                    <div>
                      <label className="font-bold">{`Host `}</label>
                      <label>{center.host}</label>||
                      <label>{center.host_phone}</label>
                    </div>
                    {/* teacher */}
                    <div>
                      <label className="font-bold">{`Teacher `}</label>
                      <label>{center.teacher}</label>||
                      <label>{center.teacher_phone}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bogije */}
            <div>
              <h3 className="font-bold text-xl">Bogije Zone</h3>
              <div>
                {bogijeZone.map((center, i) => (
                  <div className="my-2" key={i}>
                    {/* center */}
                    <h4 className="font-bold text-rose-800">{`${center.center} Center`}</h4>
                    {/* host */}
                    <div>
                      <label className="font-bold">{`Host `}</label>
                      <label>{center.host}</label>||
                      <label>{center.host_phone}</label>
                    </div>
                    {/* teacher */}
                    <div>
                      <label className="font-bold">{`Teacher `}</label>
                      <label>{center.teacher}</label>||
                      <label>{center.teacher_phone}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
