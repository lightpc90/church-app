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
      <div className="px-5 my-10">
        <div>
          <div>
            <span className="text-rose-800 font-bold">RCCG Beautiful Gate</span> is home for all. We are glad to
            have you
          </div>
        </div>
        {/* map */}
        <div className="text-center my-3">
          <p className="text-slate-400">Locate us on map</p>
          <h3 className="font-bold">Get Direction</h3>
          <MapComponent />
        </div>
        {/* enquiry form */}
        <div>
          <div>
            <h4>For Enquiry</h4>
            <h3>Kindly fill the form below</h3>
          </div>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
};

export default page;
