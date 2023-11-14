"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const initialFormData = {
    email: "",
    phone: "",
    pwd: "",
    confirmPwd: "",
  }

  const router = useRouter()
  const { status } = useSession();
  console.log(status);
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    //   send form data to backend for authentication
    e.preventDefault();
    setLoading(true)
    console.log(formData);
    const res = await fetch(`api/Register`, {
      method: "POST",
      headers: {'Content-Type': "application/json",},
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!data.success) {
      console.log("failed")
      setFormData(initialFormData)
      setLoading(false)
      toast.error(data.error)
      console.log(data.error)
    }
    else if (data.success) {
      toast.success(data.message);
      console.log("success")
      router.push("/login");
      setLoading(false)
      setFormData(initialFormData)
      console.log(data.message)
    }  
  };
  

  

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mx-4 p-5 my-5 md:w-[400px]"
      >
        <p className="font-semibold text-center mb-5 text-lg">
          Registration Form
        </p>
        {/* paragraph to display return message/error from registeration api */}
        {message && (
          <p className="bg-[#172554] p-1 mt-5 rounded-sm flex justify-center items-center w-full text-white">
            {message}
          </p>
        )}
        <p>
          Register with{" "}
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
              setMessage();
              setFormData({ ...formData, email: e.target.value });
              console.log(formData);
            }}
            className="p-2 rounded-md shadow-md border-2 border-slate-400"
            id="email"
            type="email"
            value={formData.email}
            placeholder="Email"
          />
        )}
        {!useEmail && (
          <input
            onChange={(e) => {
              setMessage();
              setFormData({ ...formData, phone: e.target.value });
              console.log(formData);
            }}
            className="p-2 rounded-md shadow-md border-2 border-slate-400"
            id="phone"
            type="number"
            value={formData.phone}
            placeholder="Phone Number"
          />
        )}
        <input
          onChange={(e) => {
            setMessage();
            setFormData({ ...formData, pwd: e.target.value });
            console.log(formData);
          }}
          className="p-2 rounded-md shadow-md border-2 border-slate-400"
          id="password"
          type="password"
          value={formData.pwd}
          placeholder="Password"
        />
        <input
          onChange={(e) => {
            setMessage();
            setFormData({ ...formData, confirmPwd: e.target.value });
            console.log(formData);
          }}
          className="p-2 rounded-md shadow-md border-2 border-slate-400"
          id="confirmPwd"
          type="password"
          value={formData.confirmPwd}
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white"
        >
          {loading ? `Loading...` : `Register`}
        </button>
      </form>
    </div>
  );}

export default RegisterForm;
