
import React from 'react'
import Image from 'next/image';

const Avatar = (dp) => {
  console.log("dp from avatar: ", dp)
  return (
    <div className="flex justify-center items-center h-[3rem] w-[3rem] rounded-full overflow-hidden bg-[#070749] my-5">
      <Image
        src={`${dp}` || "/avatar.png"}
        alt="dp avatar"
        width={50}
        height={50}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export default Avatar