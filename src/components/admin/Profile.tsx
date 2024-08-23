import React from "react";
import dp from "../../../public/default_dp.webp";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-[50px] w-[50px] rounded-full bg-blue-800 flex items-center justify-center overflow-hidden">
        <Image src={dp} alt="display picture" priority className="flex w-full h-full object-cover" />
      </div>
      <div className="flex gap-[8px] items-center">
        <span className="text-lg text-slate-600">Hi,</span>
        <span className="font-bold">Fola Abbey</span>
      </div>
    </div>
  );
};

export default Profile;
