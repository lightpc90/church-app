import React from "react";
import Header from "@/components/UILayouts/Header";
import HeaderImage from "../../../public/headers/house-fellowship.jpg";
import { HouseFellowshipCentersData } from "@/components/data/Data";
import { FiSearch } from "react-icons/fi";
import HfcLayout from "./HfcLayout";
import { initHfcForm } from "@/components/UILayouts/HouseFellowshipForm";

async function getHFC() {
  try {
    const response = await fetch(
      `${process.env.domainUrl}/api/houseFellowshipCenters`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (e) {console.log("server error: ", e)}
}

const Page = async () => {
  const hfc: typeof initHfcForm[] = await getHFC();
  const lakoweZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Lakowe Zone"
  );
  const eputuZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Eputu Zone"
  );
  const bogijeZone = HouseFellowshipCentersData.filter(
    (center) => center.zone === "Bogije Zone"
  );

  if(hfc?.length > 0 ){
    const lakowezone = hfc.filter((center)=>center.zone === 'lakowe')
    const eputuzone = hfc.filter((center)=>center.zone === 'eputu')
    const bogijezone = hfc.filter((center)=>center.zone === 'bogije')
  }
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
        <div className="flex bg-[#FDF9F9]  lg:bg-rose-800 rounded-full my-5 lg:w-[500px] sticky top-[90px] overflow-hidden">
          <input
            type="text"
            placeholder="Search House Fellowship Centers"
            className="w-[90%] px-5 py-2 bg-[#FDF9F9] outline-none"
          />
          {/* search icon */}
          <span className="absolute top-[50%] right-2 translate-y-[-50%] lg:text-white ">
            <FiSearch size={25} />
          </span>
        </div>
        <div>
          <p>
            Below is the list of house fellowship centers and their respectively
            contacts
          </p>
          {/* house fellowship centers */}
          <div className="flex flex-col gap-10 ">
            <div className="my-5">
              <h3 className="font-bold text-xl">Lakowe Zone</h3>
              <div>
                {lakoweZone.map((center, i) => (
                  <HfcLayout key={i} center={center} />
                ))}
              </div>
            </div>
            {/* Eputu Zone */}
            <div>
              <h3 className="font-bold text-xl">Eputu Zone</h3>
              <div>
                {eputuZone.map((center, i) => (
                  <HfcLayout key={i} center={center} />
                ))}
              </div>
            </div>
            {/* Bogije */}
            <div>
              <h3 className="font-bold text-xl">Bogije Zone</h3>
              <div>
                {bogijeZone.map((center, i) => (
                  <HfcLayout key={i} center={center} />
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
