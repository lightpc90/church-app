"use client";

import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const handleSubmit = () => {
    //   send form data to backend for authentication
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mx-4 p-5 my-5 md:w-[400px]">
              <input
                  onChange={(e)=>{setFormData({...formData, email: e.target.value})}}
          className="px-2 py-1 rounded-md"
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
        />
              <input
                  onChange={(e)=>{setFormData({...formData, password: e.target.value})}}
          className="px-2 py-1 rounded-md"
          id="password"
          type="password"
          value={formData.password}
            placeholder="Password"
        />
        <submit className="flex py-1 px-2 justify-center rounded-xl bg-slate-950 text-white">
          Submit
        </submit>
      </form>
    </div>
  );
};

export default LoginForm;
