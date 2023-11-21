'use client'

import AvatarImage from "./avatarImage";

export const PastorLayout = ({ dp, name, social }) => {
  console.log("dp from pastor layout", dp)
  const pstAvatar = AvatarImage(dp)
  return (
    <div className="flex flex-col w-[45%] md:w-[30%]">
      {/* Avatar */}
      <div>
        {pstAvatar}
      </div>

      <p className='w-full'>{name}</p>
      <p className='text-sm w-full'>{social}</p>
    </div>
  );
};
