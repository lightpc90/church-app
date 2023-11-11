"use client";

import React, { useState } from "react";

const LoginForm = () => {
  const [useEmail, setUseEmail] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    pwd: "",
  });

    const handleSubmit = (e) => {
      //   send form data to backend for authentication
      e.preventDefault()
      console.log(formData);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 p-5 my-5 md:w-[400px]"
      >
        <p className="font-semibold text-center mb-5 text-lg">Login Form</p>
        <p>
          Login with{" "}
          <span>
            <button
              className="text-[blue]"
              onClick={(e) => {
                e.preventDefault();
                setUseEmail(!useEmail);
                setFormData({ ...formData, phone: "", email: "" });
              }}
            >
              {useEmail ? <p>Phone Number</p> : <p>Email</p>}
            </button>
          </span>
        </p>
        {useEmail && (
          <input
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              console.log(formData);
            }}
            className="p-2 rounded-md shadow-md ring-1 ring-gray-400"
            id="email"
            type="email"
            value={formData.email}
            placeholder="Email"
          />
        )}
        {!useEmail && (
          <input
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              console.log(formData);
            }}
            className="p-2 rounded-md shadow-md ring-1 ring-gray-400"
            id="phone"
            type="number"
            value={formData.phone}
            placeholder="Phone Number"
          />
        )}
        <input
          onChange={(e) => {
            setFormData({ ...formData, pwd: e.target.value });
            console.log(formData);
          }}
          className="p-2 rounded-md shadow-md ring-1 ring-gray-400"
          id="password"
          type="password"
          value={formData.pwd}
          placeholder="Password"
        />
        <p className="text-[blue]">Forgot Password?</p>
        <button
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
