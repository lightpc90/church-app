"use client";

import {useState} from "react";
import Info from "@/components/user/Info";
import Footer from "@/components/Footer";
import AvatarImage from "@/components/avatarImage";

import { useAuth } from "@/context/globalState";
import EditModal from "@/components/editModal";

const Page = () => {
  const { signOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const info = Info();
  const avatar = AvatarImage("");

  return (
    <>
      <div className="flex flex-col mt-[80px] min-h-[400px] justify-center p-5 bg-slate-500 relative">
        <div className="flex justify-end">
          <button onClick={()=>setIsOpen(true)} className="font-semibold mt-5 text-sm bg-slate-800 text-white py-1 px-2 w-4/12 md:w-2/12 lg:w-[120px]  ">
            Edit Profile
          </button>
        </div>
        <div
          onClick={() => {
            signOut();
          }}
          className="flex justify-end"
        >
          <button className="font-semibold text-sm py-1 w-4/12 md:w-2/12 lg:w-[120px]  ">
            Logout
          </button>
        </div>

        <div>{avatar}</div>

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
