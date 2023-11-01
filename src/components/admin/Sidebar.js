import React from 'react'
import Image from 'next/image'
import { GiNotebook, GiGiftOfKnowledge } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { IoIosStats } from 'react-icons/io'
import { FaPray } from 'react-icons/fa'
import { MdOutlineManageHistory } from 'react-icons/md'


const Sidebar = ({
    handleProfileClick,
    handleStatsClick,
    handleAttendanceClick,
    handleRegUsersClick,
    handleContentMgtClick,
    handlePrayerReqClick,
    handleTestimonyClick,
    profile,
    stat,
    attendance,
    regUser,
    contentMgt,
    prayerReq,
    testimony
}) => {
  return (
    <div className="bg-white h-screen fixed w-14 lg:w-20 flex flex-col justify-evenly items-center px-3 pb-[80px] border-2 border-r-slate-800 overflow-auto">
      {/* profile */}
      <div
        onClick={handleProfileClick}
        className="flex justify-center items-center h-12 w-12 lg:h-16 lg:w-16 rounded-full overflow-hidden bg-gray-100 my-5"
      >
        <Image
          src="/avatar.png"
          alt="dp avatar"
          width={200}
          height={200}
          className="h-full w-full object-cover"
        />
      </div>
      {/*Mark attendance and Manage User */}
      <div
        onClick={handleAttendanceClick}
        className=" flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <GiNotebook size={30} className="text-blue-800" />
      </div>
      {/* Register User and add follow up */}
      <div
        onClick={handleRegUsersClick}
        className="flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <AiOutlineUsergroupAdd size={30} className="text-blue-800" />
      </div>

      {/* Attendance Statistics view */}
      <div
        onClick={handleStatsClick}
        className="flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <IoIosStats size={30} className="text-blue-800" />
      </div>

      {/* Web content management */}
      <div
        onClick={handleContentMgtClick}
        className="flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <MdOutlineManageHistory size={30} className="text-blue-800" />
      </div>
      {/* Prayer Request View */}
      <div
        onClick={handlePrayerReqClick}
        className="flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <FaPray size={30} className="text-blue-800" />
      </div>
      {/* Testimonies view */}
      <div
        onClick={handleTestimonyClick}
        className="flex bg-gray-200 rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center"
      >
        <GiGiftOfKnowledge size={30} className="text-blue-800" />
      </div>
    </div>
  );
}

export default Sidebar