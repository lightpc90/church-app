'use client'

import Profile from "@/components/user/profile"
import Searchworkers from "@/components/admin/Searchworkers"
import RegisterForm from "@/components/RegisterForm";
import UpdateSlider from "@/components/admin/updateSlider";
import AltarCallFormOrFirstTimer from "@/components/admin/AltarCallFormOrFirstTimer";
import UpdateGallery from "@/components/admin/UpdateGallery";
import UpdateEvents from "@/components/admin/UpdateEvents";
import ViewAttendance from "@/components/admin/ViewAttendance";
import ViewPrayerReqest from "@/components/admin/ViewPrayerReqest";
import ViewTestimonies from "@/components/admin/ViewTestimonies";
import Sidebar from "@/components/admin/Sidebar";

import { useState } from "react";

const Page = () => {
  const [profile, setProfile] = useState(true)
  const [attendance, setAttendance] = useState(false)
  const [regUser, setRegUser] = useState(false)
  const [stat, setStat] = useState(false)
  const [contentMgt, setContentMgt] = useState(false)
  const [prayerReq, setPrayerReq] = useState(false)
  const [testimony, setTestimony] = useState(false)

  const handleProfileClick = () => {
    setAttendance(false)
    setRegUser(false)
    setStat(false)
    setContentMgt(false)
    setPrayerReq(false)
    setTestimony(false)
    setProfile(true)
  }
  const handleStatsClick = () => {
    setProfile(false)
    setAttendance(false)
    setRegUser(false) 
    setContentMgt(false)
    setPrayerReq(false)
    setTestimony(false)
    setStat(true)
  }
  const handleAttendanceClick = () => {
    setProfile(false)
    setStat(false)
    setRegUser(false)
    setContentMgt(false)
    setPrayerReq(false)
    setTestimony(false)
    setAttendance(true)
  }
  const handleRegUsersClick = () => {
    setProfile(false)
    setStat(false)
    setAttendance(false)
    setContentMgt(false)
    setPrayerReq(false)
    setTestimony(false)
    setRegUser(true)
  }
  const handleContentMgtClick = () => {
    setProfile(false)
    setStat(false)
    setAttendance(false)
    setRegUser(false)
    setPrayerReq(false)
    setTestimony(false)
    setContentMgt(true)
  }
  const handlePrayerReqClick = () => {
    setProfile(false)
    setStat(false)  
    setAttendance(false)
    setRegUser(false)
    setContentMgt(false)
    setTestimony(false)
    setPrayerReq(true)
  }
  const handleTestimonyClick = () => {
    setProfile(false)
    setStat(false)
    setAttendance(false)
    setRegUser(false)
    setContentMgt(false)
    setPrayerReq(false)
    setTestimony(true)
  }
  
    return (
      <div className="mt-[80px]">
        <Sidebar
          handleProfileClick={handleProfileClick}
          handleStatsClick={handleStatsClick}
          handleAttendanceClick={handleAttendanceClick}
          handleRegUsersClick={handleRegUsersClick}
          handleContentMgtClick={handleContentMgtClick}
          handlePrayerReqClick={handlePrayerReqClick}
          handleTestimonyClick={handleTestimonyClick}
          profile={profile}
          stat={stat}
          attendance={attendance}
          regUser={regUser}
          contentMgt={contentMgt}
          prayerReq={prayerReq}
          testimony={testimony}
        />
        <section className="p-2 ml-16 lg:ml-20 min-h-screen">
          <div className="flex justify-between">
            <p className="font-bold lg:text-2xl">Admin Dashboard</p>
            <p className="font-medium md:text-xl">Welcome, Fola</p>
          </div>
          {/* Dashboard components */}
          <div className="flex flex-wrap justify-center items-center">
            {/* Profile Board */}
            {profile && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <Profile />
                </div>
              </>
            )}
            {/* User Management and attendance */}
            {attendance && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <Searchworkers />
                </div>
              </>
            )}
            {/* Register User */}
            {regUser && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <h4 className="text-white text-center">User Registration</h4>
                  <RegisterForm />
                </div>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <h4 className="text-white text-center">
                    Follow Up Forms - First Timer and Altar Call
                  </h4>
                  <AltarCallFormOrFirstTimer />
                </div>
              </>
            )}
            {/* Statistic view */}
            {stat && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <ViewAttendance />
                </div>
              </>
            )}
            {/* wewb content management */}
            {contentMgt && (
              <section className="flex flex-wrap justify-center items-center gap-3 w-full">
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full md:w-4/12 p-3 shadow-lg rounded-md mt-5 lg:m-20">
                  <UpdateSlider />
                </div>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full md:w-4/12 p-3 shadow-lg rounded-md mt-5 lg:m-20">
                  <UpdateGallery />
                </div>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 lg:m-20">
                  <UpdateEvents />
                </div>
              </section>
            )}
            {/* Prayer requests list view */}
            {prayerReq && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <ViewPrayerReqest />
                </div>
              </>
            )}
            {testimony && (
              <>
                <div className="bg-gradient-to-tr from-[#172554] to-[#3b0764] w-full p-3 shadow-lg rounded-md mt-5 md:m-8 lg:m-20">
                  <ViewTestimonies />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    );
}

export default Page