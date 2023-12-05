'use client'

import AvatarImage from "./avatarImage";

export const PastorLayout = ({ dp, name, social }) => {
  console.log("dp from pastor layout", dp)
  const pstAvatar = AvatarImage(dp)
  return (
    <div className="flex flex-col w-[45%] md:w-[30%]">
      {/* Avatar */}
      <div className="flex justify-center h-10 w-10 md:h-[3rem] md:w-[3rem] lg:h-12 lg:w-12 items-center rounded-full overflow-hidden bg-[#070749]">
        {pstAvatar}
      </div>

      <p className="w-full">{name}</p>
      <p className="text-sm w-full">{social}</p>
    </div>
  );
};
