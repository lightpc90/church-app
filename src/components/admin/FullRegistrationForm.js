import { useState, useEffect } from "react";
import { useAuth } from "@/context/globalState";
import { months, houseFellowshipCenters, depts } from "../constants";
import toast from "react-hot-toast";

const FullRegistrationForm = () => {
  const { currentUserId, userData, setUserData, setUsers, users } = useAuth();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [dept, setDept] = useState("");
  const [houseFellowship, setHouseFellowship] = useState("");
  const [gender, setGender] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");

  const [maxDaysInAMonth, setMaxDaysInAMonth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // FORM SUBMISSION HANDLER
  const handleSubmit = async () => {
    setLoading(true);

    let doc = {};
    if (pwd !== confirmPwd) {
      toast.error("passwords do not match");
      return;
    }
    if (!firstname || !lastname || !dept || !gender || (!phone && !email)) {
      toast.error(`fill all the required fields`);
      setLoading(false);
      console.log("fill all required fields");
      return;
    }
    if (firstname) {
      doc["firstname"] = firstname;
      console.log("first name added", firstname);
    }
    if (lastname) {
      doc["lastname"] = lastname;
      console.log("last name added", lastname);
    }
    if (email) {
      doc["email"] = email;
      console.log("email added", email);
    }
    if (phone) {
      doc["phone"] = phone;
      console.log("phone number added", phone);
    }
    if (pwd) {
      doc["pwd"] = pwd;
    }
    if (birthdayMonth || birthDay) {
      if (birthdayMonth && birthDay) {
        doc["birthDay"] = birthDay;
        doc["birthdayMonth"] = birthdayMonth;
        console.log("birthday month and day added ", birthdayMonth, birthDay);
      } else {
        toast.error("please enter both month and day");
        setLoading(false);
        console.log("enter both month and day");
        return;
      }
    }
    if (dept) {
      doc["dept"] = dept;
      console.log("department added", dept);
    }
    if (gender) {
      doc["gender"] = gender;
      console.log("gender added", gender);
    }
    if (houseFellowship) {
      doc["houseFellowship"] = houseFellowship;
      console.log("house fellowship added", houseFellowship);
    }
    if (residentialAddress) {
      doc["residentialAddress"] = residentialAddress;
      console.log("address added", residentialAddress);
    }
    doc["registeredBy"] = currentUserId;
    // submit new user doc to the RegistrationByAdmin api
    console.log("new user to register: ", doc);
    const res = await fetch("/api/auth/RegistrationByAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doc),
    });

    const newUser = await res.json();
    if (!newUser.success) {
      toast.error(newUser.error);
    } else if (newUser.success) {
      console.log("New User created", newUser.data);
      setUsers([...users, newUser.data]);
      toast.success(newUser.message);
      // RESET THE INPUT VALUES
      setFirstname('')
      setLastname('')
      setPhone('')
      setPwd('')
      setConfirmPwd('')
      setEmail('')
      setBirthdayMonth('')
      setBirthDay('')
      setDept('')
      setGender('')
      setHouseFellowship('')
      setResidentialAddress('')
    }
    setLoading(false);
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
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">
            Email or Phone is Required
          </label>
          <input
            className="p-2 rounded-md shadow-md"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-600">{error}</p>}
        </div>

        {/* Set Phone Number */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">
            Phone or Email is Required
          </label>
          <input
            className="p-2 rounded-md shadow-md"
            type="Number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
          />
          {error && <p className="text-red-800">{error}</p>}
        </div>
        {/* Set Password */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <input
            className="p-2 rounded-md shadow-md"
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value);
              // setError("");
            }}
          />
          {error && <p className="text-red-800">{error}</p>}
        </div>

        {/* Set confirm password */}
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Required</label>
          <input
            className="p-2 rounded-md shadow-md"
            type="password"
            placeholder="Confirm Password"
            value={confirmPwd}
            onChange={(e) => {
              setConfirmPwd(e.target.value);
              // setError("");
            }}
          />
        </div>
        {/* Set Birthdate Month */}
        <label className="text-gray-500 text-sm">Birthday Date</label>
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
        <div className="mt-5">
          <button
            disabled={loading}
            className="bg-green-900 w-full py-1 px-3 mx-1 text-white"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullRegistrationForm;
