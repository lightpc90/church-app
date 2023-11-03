"use client";

import React, { useState } from "react";

const LoginForm = () => {
  const [useEmail, setUseEmail] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

    const handleSubmit = () => {
    //   send form data to backend for authentication
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 p-5 my-5 md:w-[400px]"
      >
        <p>
          Login with{" "}
          <span>
            <button
              className="text-[blue]"
              onClick={(e) => {
                e.preventDefault();
                setUseEmail(!useEmail);
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
            }}
            className="p-2 rounded-md shadow-md"
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
            }}
            className="p-2 rounded-md shadow-md"
            id="phone"
            type="number"
            value={formData.phone}
            placeholder="Phone Number"
          />
        )}
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
        <p className="text-[blue]">Forgot Password?</p>
        <submit className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white">
          Login
        </submit>
      </form>
    </div>
  );
};

export default LoginForm;
