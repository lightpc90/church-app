'use client'

import {useState} from 'react'

const ViewAttendance = () => {
  const date = new Date().getDate();
  const [formData, setFormData] = useState({
    dept: 'mediaTech'
  })
  return (
    <div>
      <section className="flex flex-wrap mb-2 text-white border-2 rounded-xl p-2 md:p-5 w-full">
        {/* Attendance Stat Summary */}
        <h5 className="w-full">Attendance Stat</h5>
        <p className="text-[#94a3b8]">{date}</p>

        <div className="flex flex-wrap justify-between items-center gap-3 w-full">
          {/* Total data */}
          <div className="flex justify-between items-center w-full md:w-[30%] bg-gradient-to-tr from-[#3f4346] to-[#d2d5df] hover:from-[#8b5cf6] hover:to-[#32343a] rounded-md p-2 shadow-md">
            <div>
              <h3>500</h3>
              <p className="text-[#94a3b8]">Total</p>
            </div>
            <div className="bg-[#0f766e] p-2 rounded-xl">+10%</div>
          </div>

          {/* Male data */}
          <div className="flex justify-between items-center w-full md:w-[30%]  bg-gradient-to-tr from-[#3f4346] to-[#d2d5df] hover:from-[#8b5cf6] hover:to-[#32343a]  rounded-md p-2 shadow-md">
            <div>
              <h3>210</h3>
              <p className="text-[#94a3b8]">Male</p>
            </div>
            <div className=" bg-[#0f766e] p-2 rounded-xl">+8%</div>
          </div>

          {/* Female Data */}
          <div className="flex justify-between items-center w-full md:w-[30%]  bg-gradient-to-tr from-[#3f4346] to-[#d2d5df] hover:from-[#8b5cf6] hover:to-[#32343a]  rounded-md p-2 shadow-md">
            <div>
              <h3>290</h3>
              <p className="text-[#94a3b8]">Female</p>
            </div>
            {/* change data */}
            <div className=" bg-[#f43f5e] p-2 rounded-xl">-4%</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center w-full md:w-4/12">
          {/* Stat Summary by Department */}
          <div className="my-3">
            <h6>Stat By Department</h6>
            <select
              className="block w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-400"
              value={formData.dept}
              onChange={(e) => {
                setFormData({ ...formData, dept: e.target.value });
              }}
            >
              <option value="mediaTech">Media and Tech</option>
              <option value="prayer">Prayer</option>
              <option value="sanitation">Sanitation</option>
              <option value="choir">Choir</option>
              <option value="protocol">Protocol</option>
              <option value="ushering">Ushering</option>
              <option value="sundaySchool">Sunday School</option>
              <option value="childrenTeach">Children Teacher</option>
            </select>
          </div>
          <h4 className="border-2 p-2 rounded-xl shadow-md">
            7{" "}
            <span className="text-[#94a3b8] text-sm">
              out of 22 Total members
            </span>
          </h4>
        </div>

        {/* Last 3 sundays Chart*/}
      </section>
    </div>
  );
}

export default ViewAttendance