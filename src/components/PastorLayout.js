'use client'

import Avatar from "./avatar";

export const PastorLayout = ({ dp, name, social }) => {
  return (
    <div className=" w-[45%] md:w-[30%]">
      {/* Avatar */}
      <div className="">
        <Avatar dp={dp} />
      </div>

      <p>{name}</p>
      <p>{social}</p>
    </div>
  );
};
