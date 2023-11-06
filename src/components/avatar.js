
import React from 'react'
import Image from 'next/image';

const Avatar = ({dp}) => {
  return (
      <div className="flex justify-center items-center h-[110px] w-[110px] rounded-full overflow-hidden bg-[#070749] my-5">
        <Image
          src={ `${dp}` || "/avatar.png"}
          alt="dp avatar"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
  );
}

export default Avatar