import React from "react";
import { useAuth } from "@/context/globalState";

const Info = () => {
  const { currentUser } = useAuth();
  let firstname, lastname, gender, phone, email, dept, DoB, username, residentialAddress;

  currentUser?.firstname
    ? (firstname = currentUser.firstname)
    : (firstname = "Not Set");
  
    currentUser?.gender
      ? (gender = currentUser.gender)
      : (gender = "Not Set");

  currentUser?.lastname
    ? (lastname = currentUser.lastname)
    : (lastname = "Not Set");

  currentUser?.phone ? (phone = currentUser.phone) : (phone = "Not Set");

  currentUser?.email ? (email = currentUser.firstname) : (email = "Not Set");

  currentUser?.dept ? (dept = currentUser.dept) : (dept = "Not Set");
  
  currentUser?.DoB ? (DoB = currentUser.DoB) : (DoB = "Not Set");
  currentUser?.username ? (username = currentUser.username) : (username = "Not Set");
  currentUser?.residentialAddress ? (residentialAddress = currentUser.residentialAddress) : (residentialAddress = "Not Set");
    
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
