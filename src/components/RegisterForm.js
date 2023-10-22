'use client'

import React, { useState } from 'react'

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPass: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("from submit button: ",formData)
        // send form data to backend for validation and registration
    }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 pt-5 md:w-[400px]"
      >
        <input
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            console.log(formData);
          }}
          className="px-2 py-1 rounded-md"
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, phone: e.target.value });
            console.log(formData);
          }}
          className="px-2 py-1 rounded-md"
          id="phone"
          type="number"
          value={formData.phone}
          placeholder="Phone"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, firstName: e.target.value });
            console.log(formData);
          }}
          className="px-2 py-1 rounded-md"
          id="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First Name"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, lastName: e.target.value });
            console.log(formData);
          }}
          className="px-2 py-1 rounded-md"
          id="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Last Name"
          required
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            console.log(formData)
          }}
          className="px-2 py-1 rounded-md"
          id="password"
          type="password"
          value={formData.password}
          placeholder="Password"
        />
        <input
          onChange={(e) => {
            setFormData({ ...formData, confirmPass: e.target.value });
            console.log(formData);
          }}
          className="px-2 py-1 rounded-md"
          id="confirmpassword"
          type="password"
          value={formData.confirmPass}
          placeholder="Confirm password"
        />
        <button type='submit' className="flex py-1 px-2 justify-center rounded-xl bg-slate-950 text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm