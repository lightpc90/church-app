'use client'

import { useState } from "react";
import Loading from "../loading/RequestLoading";

const formInit = {
  fullname: "",
  phone: "",
  email: "",
  enquiry: "",
}
const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formInit);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      console.log("Failed to create new convert")
      alert("Failed to send testimony! Try again")
      return
    };
    const _res = await response.json();
    if (!_res.success) {
      console.log("Failed! Try again")
      alert(_res.error)
      return
    }
    console.log(_res);
    setLoading(false);
    setFormData(formInit)
    alert("Request sent successfully");
  };
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] lg:w-[40%] relative">
      <h1 className="font-bold text-lg text-blue-950">Enquiry Form</h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            value={formData.fullname}
            onChange={(e) => setFormData({
              ...formData, fullname: e.target.value
            })}
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone">Phone Number</label>
          <input
            value={formData.phone}
            onChange={(e) => setFormData({
              ...formData, phone: e.target.value
            })}
            id="phone"
            type="number"
            placeholder="08123456789"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={(e) => setFormData({
              ...formData, email: e.target.value
            })}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="address">Your Enquiry</label>
          <textarea
            value={formData.enquiry}
            onChange={(e) => setFormData({
              ...formData, enquiry: e.target.value
            })}
            id="enquiry"
            placeholder="Your enquiry here!"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <button onClick={handleSubmit} disabled={loading} className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2">
          Send Enquiry
        </button>
      </div>
      {loading && (
        <div className="absolute inset-0 opacity-90 h-full w-full overflow-hidden">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;
