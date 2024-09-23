import React from "react";
import Header from "@/components/UILayouts/Header";
import headerImage from "../../../public/headers/Ch6.jpg";
import MapComponent from "@/components/map/GoogleMap";
import EnquiryForm from "@/components/UILayouts/EnquiryForm";

const page = () => {
  return (
    <div className="bg-[#D9D9D9]">
      <Header title="Contact Us" imageUrl={headerImage.src} />
      {/* content */}
      <div className="px-5 py-10">
        <div>
          <div className="text-center">
            <span className="text-rose-800 font-bold">RCCG Beautiful Gate</span>{" "}
            is home for all. We are glad to have you
          </div>
        </div>
        {/* map */}
        <div className="text-center my-5">
          <p className="text-slate-400">Locate us on map</p>
          <h3 className="font-bold">Get Direction</h3>
          <div className="h-[600px] lg:h-[800px] lg:w-[60%] bg-slate-700 ">
            <MapComponent />
          </div>
        </div>
        {/* enquiry form */}
        <div className="">
          <div className="text-center my-3 text-rose-800">
            <h4>For Enquiry</h4>
            <h3>Kindly fill the form below</h3>
          </div>
          <div className="w-full flex justify-center">

          <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
