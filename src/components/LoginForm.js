"use client";

import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div>
      <form className="flex flex-col gap-3 mx-4 p-5 my-5 md:w-[400px]">
        <input
          className="px-2 py-1 rounded-md"
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
        />
        <input
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
