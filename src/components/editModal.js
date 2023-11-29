"use client";

import { useState, useEffect } from "react";
import { months, depts, houseFellowshipCenters } from "./constants";
import toast from "react-hot-toast";
import { useAuth } from "@/context/globalState";

const EditModal = ({ setIsOpen }) => {
   const { currentUserId, userData, setUserData } = useAuth();
  const [firstname, setFirstname] = useState(userData?.firstname ? userData.firstname : '');
  const [lastname, setLastname] = useState(
    userData?.lastname ? userData.lastname : ""
  );
  const [email, setEmail] = useState(
    userData?.email ? userData.email : ""
  );
  const [phone, setPhone] = useState(
    userData?.phone ? userData.phone : ""
  );
  const [birthdayMonth, setBirthdayMonth] = useState(
    userData?.birthdayMonth ? userData.birthdayMonth : ""
  );
  const [birthDay, setBirthDay] = useState(
    userData?.birthDay ? userData.birthDay : ""
  );
  const [dept, setDept] = useState(
    userData?.dept ? userData.dept : ""
  );
  const [houseFellowship, setHouseFellowship] = useState(
    userData?.houseFellowship ? userData.houseFellowship : ""
  );
  const [gender, setGender] = useState(
    userData?.gender ? userData.gender : ""
  );
  const [residentialAddress, setResidentialAddress] = useState(
    userData?.residentialAddress ? userData.residentialAddress : ""
  );
  const [maxDaysInAMonth, setMaxDaysInAMonth] = useState([]);

  const [loading, setLoading] = useState(false);

 

  const daysInAMonth = () => {
    const _birthdayMonth = parseInt(birthdayMonth);
    if (
      _birthdayMonth === 1 ||
      _birthdayMonth === 3 ||
      _birthdayMonth === 5 ||
      _birthdayMonth === 7 ||
      _birthdayMonth === 8 ||
      _birthdayMonth === 10 ||
      _birthdayMonth === 12
    )
      return 31;
    else if (
      _birthdayMonth === 4 ||
      _birthdayMonth === 6 ||
      _birthdayMonth === 9 ||
      _birthdayMonth === 11
    )
      return 30;
    else return 28;
  };

  useEffect(() => {
    let maxDays = daysInAMonth();
    const list = [];
    for (let i = 1; i <= maxDays; i++) {
      list.push(i);
    }
    setMaxDaysInAMonth(list);
  }, [birthdayMonth]);

  const handleSubmit = async () => {
    setLoading(true);
    let doc = {};
    if (!firstname || !lastname || !dept || !gender) {
      toast.error(`fill all the required fields`);
        setLoading(false);
        console.log("fill all required fields")
      return;
    }
    if (firstname) {
        doc["firstname"] = firstname;
        console.log("first name added", firstname)
    }
    if (lastname) {
        doc["lastname"] = lastname;
        console.log("last name added", lastname)
    }
    if (email) {
        doc["email"] = email;
        console.log("email added", email)
    }
    if (phone) {
        doc["phone"] = phone;
        console.log("phone number added", phone)
    }
    if (birthdayMonth || birthDay) {
      if (birthdayMonth && birthDay) {
        doc["birthDay"] = birthDay;
          doc["birthdayMonth"] = birthdayMonth;
          console.log("birthday month and day added ", birthdayMonth, birthDay)
      } else {
        toast.error("please enter both month and day");
          setLoading(false);
          console.log("enter both month and day")
        return;
      }
    }
    if (dept) {
        doc["dept"] = dept;
        console.log("department added", dept)
    }
     if (gender) {
       doc["gender"] = gender;
       console.log("gender added", gender);
     }
    if (houseFellowship) {
        doc["houseFellowship"] = houseFellowship;
        console.log("house fellowship added", houseFellowship)
    }
    if (residentialAddress) {
        doc["residentialAddress"] = residentialAddress;
        console.log("address added", residentialAddress)
    }
    // submit update doc to my api
      const updateDoc = { _id: currentUserId, doc };
      console.log("updateDoc: ", updateDoc)
    const res = await fetch("/api/user/updateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDoc),
    });

    const modifiedDoc = await res.json();
    if (!modifiedDoc.success) {
      setLoading(false);
      toast.error(modifiedDoc.error);
    } else if (modifiedDoc.success) {
      console.log("modified data", modifiedDoc.data);
      setUserData(modifiedDoc.data);
      toast.success(modifiedDoc.message);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-slate-800 flex flex-col gap-2 px-5 py-10 w-full md:w-[400px] justify-center">
        {/* Set First Name */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <input
            className="p-2 rounded-md shadow-md"
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>

        {/* Set Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <input
            className="p-2 rounded-md shadow-md"
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        {/* Set Email */}
        {!userData?.email && (
          <input
            className="p-2 rounded-md shadow-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* Set Phone Number */}
        {!userData?.phone && (
          <input
            className="p-2 rounded-md shadow-md"
            type="Number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        )}

        {/* Set Birthdate Month */}
        <select
          className="p-2 rounded-md shadow-md"
          value={birthdayMonth}
          onChange={(e) => setBirthdayMonth(e.target.value)}
        >
          <option value="">Birth Month</option>
          {months.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Set Birth Day */}
        <select
          className="p-2 rounded-md shadow-md"
          value={birthDay}
          onChange={(e) => {
            setBirthDay(e.target.value);
          }}
        >
          <option value="">Select Birth Day</option>
          {maxDaysInAMonth.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        {/* select department */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <select
            className="p-2 rounded-md shadow-md"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
            }}
            required
          >
            <option value="">Select Dept</option>
            {depts.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* select house fellowship */}
        <select
          className="p-2 rounded-md shadow-md"
          value={houseFellowship}
          onChange={(e) => {
            setHouseFellowship(e.target.value);
          }}
        >
          <option value="">Select House Fellowship</option>
          {houseFellowshipCenters.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>

        {/* select Gender */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <select
            className="p-2 rounded-md shadow-md"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <input
          className="p-2 rounded-md shadow-md"
          type="text"
          placeholder="Residential Address"
          value={residentialAddress}
          onChange={(e) => setResidentialAddress(e.target.value)}
        />
        <div className="text-right mt-5">
          <button
            className="bg-red-900 py-1 px-3 mx-1 text-white"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            className="bg-green-900 py-1 px-3 mx-1 text-white"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
