"use client";

import { useState } from "react";
import Loading from "../loading/RequestLoading";

const initForm = { fullname: "", phone: "", email: "", prayerRequest: "" };

const PrayerRequestForm = () => {
  const [formData, setFormData] = useState(initForm);
  const [loading, setLoading] = useState(false);
  //
  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      fullname: formData.fullname,
      phone: formData.phone,
      email: formData.email,
      prayerRequest: formData.prayerRequest,
    };
    const res = await fetch("/api/prayer-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.log("Failed to create prayer request")
      alert("Failed to send prayer request! Try again")
      return
    };
    const _res = await res.json();
    console.log(_res);
    setLoading(false);
    setFormData(initForm)
    alert("Request sent successfully");
  };
  return (
    <div className="flex flex-col items-center gap-3 w-[80%] lg:w-[40%] relative">
      <h1 className="font-bold text-lg text-blue-950">Prayer Request Form</h1>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <label htmlFor="fullName">Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="John Doe"
            className="bg-[#FFFFFF] p-2 rounded-md"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            type="number"
            placeholder="08123456789"
            className="bg-[#FFFFFF] p-2 rounded-md"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value.toString() })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-[#FFFFFF] p-2 rounded-md"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="prayer-request">Prayer Request</label>
          <textarea
            name="prayer-request"
            placeholder="Your prayer request here!"
            className="bg-[#FFFFFF] p-2 rounded-md"
            value={formData.prayerRequest}
            onChange={(e) =>
              setFormData({ ...formData, prayerRequest: e.target.value })
            }
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-950 hover:bg-blue-800 p-2 text-white rounded-md w-full my-2"
        >
          Pray With Me
        </button>
      </div>
      {/* loading component */}
      {loading && <div className="absolute inset-0 opacity-90 h-full w-full overflow-hidden">
        <Loading />
      </div>}
    </div>
  );
};

export default PrayerRequestForm;
