"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Info from "@/components/user/Info";
import Footer from "@/components/Footer";
import AvatarImage from "@/components/avatarImage";

import { useAuth } from "@/context/globalState";
import EditModal from "@/components/editModal";
import verifyToken from "@/middlewares/verifyToken";




const Page = () => {
  const router = useRouter()


  const { signOut, userData, currentUserId, accessToken } = useAuth();
    const verify = verifyToken(accessToken);

//   const getVerification = async () => {
//    verifyToken()
//  }
  
  if (!verify) {
    router.push('/')
  }

  const [isOpen, setIsOpen] = useState(false);

  const info = Info();
  const avatar = AvatarImage("");

  return (
    <>
      <div className="flex flex-col mt-[80px] min-h-[400px] justify-center p-5 bg-slate-500 relative">
        {!(
          userData?.firstname &&
          userData?.lastname &&
          userData?.dept &&
          userData?.gender
        ) && (
          <p className="bg-red-800 text-white text-center p-2">
            Please update your profile to get verified
          </p>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="font-semibold mt-5 bg-slate-800 text-white py-1 px-2 w-[130px] md:w-[150px] lg:w-[170px]  "
          >
            Update Profile
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              signOut();
            }}
            className="font-semibold text-sm py-1 w-4/12 md:w-2/12 lg:w-[120px]  "
          >
            Logout
          </button>
        </div>

        <div className="flex justify-center h-[9rem] w-[9rem] items-center rounded-full overflow-hidden bg-[#070749]">
          {avatar}
        </div>

        {/* Basic Info component */}
        <div>{info}</div>

        {/* Edit modal */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center ">
            <EditModal setIsOpen={setIsOpen} />
          </div>
        )}
      </div>
      ;
      <Footer />
    </>
  );
};

export default Page;
