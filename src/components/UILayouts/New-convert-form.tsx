"use client"

import { useState } from "react";
import Loading from "../loading/RequestLoading";

const initialData = {
  name: "",
  phone: "",
  email: "",
  address: ""
}
const NewConvertForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async () => {
    console.log("form data on client", formData);
    setLoading(true);
    const res = await fetch("/api/followUps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok){
      console.log("Failed to create new convert")
      return
    };
    const _res = await res.json();
    console.log(_res);
    setFormData(initialData);
    setLoading(false);
    alert("Request sent successfully");
  };
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] lg:w-[40%] justify-center relative">
      <h1 className="font-bold text-lg text-blue-950">New Convert Form</h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            id="fullName"
            type="text"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone">Phone Number</label>
          <input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            id="phone"
            type="number"
            placeholder="08123456789"
            className="bg-[#FFFFFF] p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#FFFFFF] p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="address">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            id="address"
            placeholder="1, Simpson str. Lakowe phase 2"
            className="bg-[#FFFFFF] p-2 rounded-md"
            required
          />
        </div>
        <button disabled={loading} onClick={handleSubmit} className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2" >Meet Our Pastor</button>
      </div>
      {loading && (
        <div className="absolute inset-0 opacity-90 h-full w-full overflow-hidden">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default NewConvertForm;
