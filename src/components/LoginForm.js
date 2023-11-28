"use client";

import React, { useState } from "react";
// import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/globalState";

const LoginForm = () => {
  const {currentUserId, signIn, setUserData} = useAuth()
  const router = useRouter()
  const formInitialValue = { email: "", phone: "", pwd: "" };

  if (currentUserId) { router.push("/") }
  
  const [useEmail, setUseEmail] = useState(false);
  const [formData, setFormData] = useState(formInitialValue);
  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)

  const handleSubmit = async (e) => {
    try{
      //   send form data to backend for authentication
      e.preventDefault();
      setButtonDisable(true);
      setLoading(true);
      console.log(formData);
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log('res: ', res)
      const jsonData = await res.json();
      console.log("data from json: ", jsonData.data);
      if (!jsonData?.success) {
        console.log("json Data failed...")
        setLoading(false)
        toast.error(jsonData.error);
        setButtonDisable(false);
      }
      else if (jsonData?.success) {
        console.log("json Data succeeded..");
        setLoading(false)
        // store user data and access token in global state
        console.log("user data got from sign in auth", jsonData.data)
        signIn(jsonData.accessToken, jsonData.data._id)
        setUserData({ ...jsonData.data })
        
        toast.success(jsonData.message);
        router.push("/");
      }
      // setFormData(formInitialValue);
      // setLoading(false);
      // setButtonDisable(false);
    }catch(e){console.error(e)}
    
    
  };

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
            setFormData({ ...formData, pwd: e.target.value });
            console.log(formData);
          }}
          className="p-2 rounded-md shadow-md border-2 border-slate-400"
          id="password"
          type="password"
          value={formData.pwd}
          placeholder="Password"
        />
        <p className="text-[blue]">Forgot Password?</p>
        <button
          disabled = {buttonDisable}
          type="submit"
          className="flex py-1 px-2 justify-center rounded-xl bg-gradient-to-tr from-[#1e1b4b] to-[#3b0764] hover:from-[#a5b4fc] hover:to-[#172554] text-white"
        >
          {loading ? `loading...` : `Login`}
        </button>
      </form>

      {/* <div className='bg-gray-300 p-3'>
        <p className="bg-gray-300 text-center text-sm">or</p>
        <button onClick={()=>signIn('google')} className="bg-slate-950 text-white py-1 px-2 w-full my-2">Sign in With Google</button>
      </div> */}
    </div>
  );
};

export default LoginForm;
