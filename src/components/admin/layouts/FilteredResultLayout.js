import React from "react";
import AvatarImage from "@/components/avatarImage";

const FilteredResultLayout = ({ item }) => {
  console.log("item object: ", item);
  const avatar = AvatarImage("");
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 md:gap-5 shadow-md rounded-sm py-1 px-2 md:p-3 bg-slate-800 lg:w-[900px]">
      <div className="flex gap-2 items-center ">
        <div className="flex justify-center h-10 w-10 md:h-[3rem] md:w-[3rem] items-center rounded-full overflow-hidden bg-[#070749]">
          {avatar}
        </div>
        <p className="md:text-xl lg:text-2xl">{`${item.firstname} ${item.lastname}`}</p>
      </div>
      <div className="hidden lg:inline text-xl text-gray-300">{ item.dept}</div>
      <div className="flex flex-wrap gap-2">
        <button className="bg-sky-400 px-4 py-2 rounded-md">Verify</button>
        <button className="bg-purple-400 px-4 py-2 rounded-md">
          Mark Attendance
        </button>
      </div>
    </div>
  );
};

export default FilteredResultLayout;
