'use client';

import { useState } from "react";
import Loading from "../loading/RequestLoading";

const formInit = {
  fullname: "",
  phone: "",
  email: "",
  testimony: "",
};

const TestimonyForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(formInit);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/testimony', {
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
      console.log(_res);
      setLoading(false);
      setFormData(formInit)
      alert("Request sent successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] lg:w-[40%] relative">
      <h1 className="font-bold text-lg text-blue-950">Testimony Form</h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            value={formData.fullname}
            onChange={(e) => setFormData({
              ...formData, fullname: e.target.value
            })}
            name="fullName"
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
            name="phone"
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
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="testimony">Your Testimony</label>
          <textarea
            value={formData.testimony}
            onChange={(e) => setFormData({
              ...formData, testimony: e.target.value
            })}
            name="testimony"
            placeholder="Your testimony here!"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <button onClick={handleSubmit} disabled={loading} className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2">
          Share
        </button>
      </div>
      {/* loading component */}
      {loading && <div className="absolute inset-0 opacity-90 h-full w-full overflow-hidden">
        <Loading />
      </div>}
    </div>
  );
};

export default TestimonyForm;
