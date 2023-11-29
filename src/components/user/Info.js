import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/globalState";

const Info = () => {
  const convertToMonth = { '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr', '5': 'May', '6': 'Jun', '7': 'Jul', '8': 'Aug', '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }
  const { userData, signOut } = useAuth();
  const month_of_birthday = convertToMonth[userData?.birthdayMonth]
  let firstname, lastname, gender, phone, verified, email, dept, DoB, username, residentialAddress;

  userData?.firstname
    ? (firstname = userData.firstname)
    : (firstname = "Not Set");
  
    userData?.gender
      ? (gender = userData.gender)
      : (gender = "Not Set");

  userData?.lastname
    ? (lastname = userData.lastname)
    : (lastname = "Not Set");

  userData?.phone ? (phone = userData.phone) : (phone = "Not Set");

  userData?.email ? (email = userData.firstname) : (email = "Not Set");

  userData?.dept ? (dept = userData.dept) : (dept = "Not Set");
  
  month_of_birthday && userData?.birthDay ? (DoB = `${month_of_birthday}, ${userData.birthDay}`) : (DoB = "Not Set");
  userData?.username ? (username = userData.username) : (username = "Not Set");
  userData?.residentialAddress ? (residentialAddress = userData.residentialAddress) : (residentialAddress = "Not Set");

  userData?.verified
    ? (verified = "Verified")
    : (verified = "Awaiting Verification");
    
  return (
    <div className="flex flex-wrap md:gap-3">
      <div className="w-full md:w-4/12 lg:w-2/12">
        {userData?.firstname &&
          userData?.lastname &&
          userData?.dept &&
          userData?.gender && (
            <div
              className={`inline border-2 ${
                userData?.verified ? "border-green-800" : "border-red-800"
              }  p-2 `}
            >
              {verified}
            </div>
          )}
        {userData?.verified && (
          <Link href="/workers/attendance" className="inline-block mx-2">
            <button className=" mt-5 bg-slate-800 text-white py-1 px-2">
              Mark Attendance
            </button>
          </Link>
        )}

        <h6 className="mt-10">Primary info</h6>
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
