'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";


import { useAuth } from "@/context/globalState";
import { convertToMonth } from "../constants";
import verifyToken from "@/middlewares/verifyToken";

const Profile = () => {
  const router = useRouter()

  const { userData, users, setUsers, accessToken } = useAuth()
  const verify = verifyToken(accessToken);
  if (!verify) {
    router.push('/')
  }
  let firstname, lastname, phone, email, dept, DoB, gender, residentialAddress;

  const month_of_birthday = convertToMonth[userData?.birthdayMonth];
  

  userData?.firstname
    ? (firstname = userData.firstname)
    : (firstname = "");

  userData?.gender ? (gender = userData.gender) : (gender = "");

  userData?.lastname ? (lastname = userData.lastname) : (lastname = "");

  userData?.phone ? (phone = userData.phone) : (phone = "");

  userData?.email ? (email = userData.firstname) : (email = "");

  userData?.dept ? (dept = userData.dept) : (dept = "");

  month_of_birthday && userData?.birthDay
    ? (DoB = `${month_of_birthday}, ${userData.birthDay}`)
    : (DoB = "");
 
  userData?.residentialAddress
    ? (residentialAddress = userData.residentialAddress)
    : (residentialAddress = "");


  return (
    <div className="flex flex-col min-h-[200px] my-5 text-white">
      {/* Profile avatar */}
      <div
        className="flex justify-center items-center h-[110px] w-[110px] rounded-full overflow-hidden bg-[#070749] my-5"
          >
            <Image src="/avatar.png" alt="dp avatar" width={200} height={200} className="h-full w-full object-cover"/>
      </div>

      <section className="my-2">
        <h3>{`${firstname} ${lastname}` }</h3>
        <p>{ phone}</p>
        <p>{ email}</p>
        <p>{ dept}</p>
        <p>{ gender}</p>
        <p>{ DoB}</p>
        <p>{ residentialAddress}</p>
      </section>

      {/* <section className="my-2">
        <h6>Attendance Stat</h6>
        <p>For the past 3 months</p>
          </section>
          
      <section className="my-2">
        <h6>Your Contents</h6>
        <p>Blogs and Stories you have posted show here</p>
      </section> */}
    </div>
  );
}

export default Profile