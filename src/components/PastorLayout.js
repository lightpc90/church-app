'use client'

import Avatar from "./avatar";

export const PastorLayout = ({ dp, name, social }) => {
  return (
    <div className="flex flex-col items-center w-[45%] md:w-[30%]">
      {/* Avatar */}
      <div className="w-full">
        <Avatar dp={dp} />
      </div>

      <p className='w-full'>{name}</p>
      <p className='text-sm w-full'>{social}</p>
    </div>
  );
};
