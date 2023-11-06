"use client";

import {useState} from "react";

const TestimonyForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    testimony: "",
    aMember: "",
  });
  return (
    <div className="flex flex-col justify-center items-center bg-[#d9d9e6] px-5 py-10 shadow-md rounded-md mt-5">
      <p className="text-center font-semibold">Testimony Form</p>
      <div className="flex flex-col gap-3 mx-4 w-full pt-5 md:w-[400px]">
        <input
          className="p-2 rounded-md shadow-md"
          value={formData.firstname}
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
          type="text"
          name="firstname"
          placeholder="First Name"
          required
        />
        <input
          className="p-2 rounded-md shadow-md"
          value={formData.lastname}
          onChange={(e) => {
            setFormData({ ...formData, lastname: e.target.value });
          }}
          type="text"
          name="lastname"
          placeholder="Last Name"
          required
        />
        <textarea
          className="p-2 rounded-md shadow-md h-40"
          value={formData.testimony}
          onChange={(e) => {
            setFormData({ ...formData, testimony: e.target.value });
          }}
          name="testimony"
          placeholder="Share Your Testimony"
          required
        />
        <select
          className="p-2 rounded-md shadow-md"
          value={formData.aMember}
          onChange={(e) => {
            setFormData({ ...formData, aMember: e.target.value });
          }}
          required
        >
          <option>Are you a member of our Parish?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <button
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white shadow-md"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TestimonyForm;
