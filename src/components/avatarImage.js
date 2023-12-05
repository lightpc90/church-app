import React from "react";
import Image from "next/image";

const AvatarImage = (dp) => {
  
  console.log("dp from avatarImage: ", dp)

  return (
      <Image
        src={`${dp}` || "/avatar.png"}
        alt="dp avatar"
        width={20}
        height={20}
        className="h-full w-full object-cover"
      /> 
  );
};

export default AvatarImage;
