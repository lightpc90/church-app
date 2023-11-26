import React from "react";
import { useAuth } from "@/context/globalState";

const Info = () => {
  const { currentUserId, signOut } = useAuth();
  let firstname, lastname, gender, phone, email, dept, DoB, username, residentialAddress;

  currentUserId?.firstname
    ? (firstname = currentUserId.firstname)
    : (firstname = "Not Set");
  
    currentUserId?.gender
      ? (gender = currentUserId.gender)
      : (gender = "Not Set");

  currentUserId?.lastname
    ? (lastname = currentUserId.lastname)
    : (lastname = "Not Set");

  currentUserId?.phone ? (phone = currentUserId.phone) : (phone = "Not Set");

  currentUserId?.email ? (email = currentUserId.firstname) : (email = "Not Set");

  currentUserId?.dept ? (dept = currentUserId.dept) : (dept = "Not Set");
  
  currentUserId?.DoB ? (DoB = currentUserId.DoB) : (DoB = "Not Set");
  currentUserId?.username ? (username = currentUserId.username) : (username = "Not Set");
  currentUserId?.residentialAddress ? (residentialAddress = currentUserId.residentialAddress) : (residentialAddress = "Not Set");
    
  return (
    <div className="flex flex-wrap md:gap-3">
      <div className="w-full md:w-4/12 lg:w-2/12">
        <h6 className="">Primary info</h6>
        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {firstname}
          </p>
          <p className="text-gray-400">First Name</p>
        </div>

        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {lastname}
          </p>
          <p className="text-gray-400">Last Name</p>
        </div>

        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {gender}
          </p>
          <p className="text-gray-400">Gender</p>
        </div>

        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {phone}
          </p>
          <p className="text-gray-400">Phone Number</p>
        </div>

        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {email}
          </p>
          <p className="text-gray-400">Email</p>
        </div>

        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {dept}
          </p>
          <p className="text-gray-400">Department</p>
        </div>
      </div>

      <div className="w-full md:w-4/12 lg:w-2/12">
        <h6 className="">Secondary Info</h6>
        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {DoB}
          </p>
          <p className="text-gray-400">Date of Birth</p>
        </div>
        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {username}
          </p>
          <p className="text-gray-400">Username</p>
        </div>
        <div className="py-2">
          <p className="bg-gray-600 border-l-4 border-slate-950 p-2 text-white">
            {residentialAddress}
          </p>
          <p className="text-gray-400">Residential Address</p>
        </div>
      </div>
    </div>
  );
};

export default Info;
