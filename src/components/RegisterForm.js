'use client'

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const RegisterForm = () => {
  const { status } = useSession()
  console.log(status)
  
    const [formData, setFormData] = useState({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      dept: "",
      gender: "",
      password: "",
      confirmPass: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault()
        // send form data to backend for validation and registration
    }

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 w-full pt-5 md:w-[400px]"
      >
        <input
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="phone"
          type="number"
          value={formData.phone}
          placeholder="Phone"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First Name"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Last Name"
          required
        />
        <select
          className="block w-full text-black p-2 border border-gray-300 rounded-md shadow-md focus:ring focus:ring-blue-200 focus:border-blue-400"
          value={formData.dept}
          onChange={(e) => {
            setFormData({ ...formData, dept: e.target.value });
          }}
        >
          <option value="">Select Department</option>
          <option value="mediaTech">Media and Tech</option>
          <option value="prayer">Prayer</option>
          <option value="sanitation">Sanitation</option>
          <option value="choir">Choir</option>
          <option value="protocol">Protocol</option>
          <option value="ushering">Ushering</option>
          <option value="sundaySchool">Sunday School</option>
          <option value="childrenTeach">Children Teacher</option>
        </select>
        <select
          className="block w-full text-black p-2 border border-gray-300 rounded-md shadow-md focus:ring focus:ring-blue-200 focus:border-blue-400"
          value={formData.gender}
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
        >
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        <input
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="password"
          type="password"
          value={formData.password}
          placeholder="Password"
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, confirmPass: e.target.value });
          }}
          className="p-2 rounded-md shadow-md"
          id="confirmpassword"
          type="password"
          value={formData.confirmPass}
          placeholder="Confirm password"
        />
        <button
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white shadow-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm