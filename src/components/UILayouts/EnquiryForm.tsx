import React from "react";

const EnquiryForm = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] lg:w-[50%]">
      <h1 className="font-bold text-lg text-blue-950">Enquiry Form</h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="number"
            placeholder="08123456789"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="address">Your Enquiry</label>
          <textarea
            id="enquiry"
            placeholder="1, Simpson str. Lakowe phase 2"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <button className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2">
          Send Enquiry
        </button>
      </div>
    </div>
  );
};

export default EnquiryForm;
