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
        className={`flex justify-center cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          profile && "ring-2 ring-purple-700 shadow-md"
        } items-center h-10 w-10 lg:h-12 lg:w-12 rounded-full overflow-hidden bg-gray-100 my-5`}
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
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          attendance && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <GiNotebook
          size={30}
          className={`text-gray-500 ${attendance && "text-purple-700"}`}
        />
      </div>
      {/* Register User and add follow up */}
      <div
        onClick={handleRegUsersClick}
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          regUser && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <AiOutlineUsergroupAdd
          size={30}
          className={`text-gray-500 ${regUser && "text-purple-700"}`}
        />
      </div>

      {/* Attendance Statistics view */}
      <div
        onClick={handleStatsClick}
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          stat && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <IoIosStats
          size={30}
          className={`text-gray-500 ${stat && "text-purple-700"}`}
        />
      </div>

      {/* Web content management */}
      <div
        onClick={handleContentMgtClick}
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          contentMgt && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <MdOutlineManageHistory
          size={30}
          className={`text-gray-500 ${contentMgt && "text-purple-700"}`}
        />
      </div>
      {/* Prayer Request View */}
      <div
        onClick={handlePrayerReqClick}
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          prayerReq && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <FaPray
          size={30}
          className={`text-gray-500 ${prayerReq && "text-purple-700"}`}
        />
      </div>
      {/* Testimonies view */}
      <div
        onClick={handleTestimonyClick}
        className={`flex bg-gray-200 cursor-pointer hover:ring-2 hover:ring-purple-700 ${
          testimony && "ring-2 ring-purple-700 shadow-md"
        } rounded-lg h-10 w-10 lg:h-12 lg:w-12 justify-center items-center`}
      >
        <GiGiftOfKnowledge
          size={30}
          className={`text-gray-500 ${testimony && "text-purple-700"}`}
        />
      </div>
    </div>
  );
}

export default Sidebar