import React from "react";
import Image from "next/image";

const AvatarImage = (dp) => {
  
  console.log("dp from avatarImage: ", dp)

  return (
    <div className="flex justify-center items-center h-[5rem] w-[5rem] md:h-[10rem] md:w-[10rem] rounded-full overflow-hidden bg-[#070749] my-5">
      <Image
        src={`${dp}` || "/avatar.png"}
        alt="dp avatar"
        width={50}
        height={50}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default AvatarImage;
