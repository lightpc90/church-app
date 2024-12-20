import React from "react";
import Header from "@/components/UILayouts/Header";
import HeaderImage from "../../../public/headers/house-fellowship.jpg";
import { HouseFellowshipCentersData } from "@/components/data/Data";
import { FiSearch } from "react-icons/fi";
import HfcLayout from "./HfcLayout";
import { initHfcForm } from "@/components/UILayouts/HouseFellowshipForm";
import { ZonesEnum } from "@/components/UILayouts/HouseFellowshipForm";
import { groupedByZone } from "@/lib/groupedByZone";

import { headers } from "next/headers";

async function getHFC(Url: string | null) {
  const url = process.env.baseUrl
  console.log("host-url for this environment: ", url)
  console.log("host for this environment: ", Url)
  try {
    const response = await fetch(
      `${Url}/api/houseFellowshipCenters`,
    );
    if (response.ok) {
      const data = await response.json();
      console.log("HFC data ", data)
      return data;
    }
  } catch (e) {console.log("server error: ", e)}
}

const Page = async () => {
  const headersList = headers()
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-protocol') || 'http'
  console.log('protocol: ', protocol)
  const data = await getHFC(`${protocol}://${host}`);
  console.log("data: ", data)
  const hfc: typeof initHfcForm[] = data?.data;
  console.log("hfc: ", hfc)

  const groupedByzone = groupedByZone(hfc)
  
  console.log("zones", groupedByzone)
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
           
            {groupedByzone && Object.keys(groupedByzone)?.map((zone, i) => (
   
              <div key={i}>
                <h3 className="font-bold text-xl">{`${zone} Zone`}</h3>
                <div>
                  {groupedByzone[zone]?.map((center, i) => (
                    <HfcLayout key={i} center={center} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
