"use client";

import { useEffect, useState } from "react";
import Card from "@/components/customeUI/Card";
import CustomBarChart from "@/components/customeUI/BarChartRechart";
import {
  deptData,
  attendanceData,
  bottomCardsData,
} from "@/components/data/Data";
import { attendanceInitData } from "@/components/initData/initData";
import { GeneralAttedanceData } from "@/components/data/Data";
import { BarChartUI } from "@/components/customeUI/BarChart";

const Overview = () => {
  const [deptSelected, setDeptSelected] = useState("");

  const [data, setData] =
    useState<typeof GeneralAttedanceData>(GeneralAttedanceData);

  const handleSelectedDept = (dept: string) => {
    const filteredDept = deptData.find((eachDept) => eachDept.dept === dept);
    return filteredDept?.total;
  };

  const getAttendance = () => {
    console.log("running getAttendance...");
    const deptAttendance = attendanceData.map((eachAttendance) => {
      console.log("eachAtt: ", eachAttendance[deptSelected]);
      return {
        attendance: eachAttendance[deptSelected].attendance,
        name: eachAttendance[deptSelected].date,
        dept: eachAttendance[deptSelected].dept,
      };
    });
    setData(deptAttendance);
  };

  useEffect(() => {
    if (deptSelected) {
      console.log("selected dept: ", deptSelected);
      getAttendance();
    }
  }, [deptSelected]);

  return (
    <div className="lg:px-10">
      {/* Title */}
      <p className="text-2xl font-bold p-2 text-blue-800 ">Overview</p>
      {/* Cards container */}
      <div className="flex flex-wrap gap-2 lg:gap-4">
        <Card
          title="234"
          subtitle="Total number of Workers"
          className="flex-1 bg-blue-100 text-blue-800 border-l-4 border-blue-800 shadow-lg"
        >
          123Men, 104Women
        </Card>
        <div className="flex flex-wrap gap-1 lg:gap-5">
          {deptData.map((dept, i) => (
            <Card
              key={i}
              title={dept.total}
              subtitle={dept.dept}
              rounded="md"
              className="text-sm lg:text-md font-seminbold shadow-lg flex-grow-1 basis-[140px] "
            >
              {`${dept.male}Men, ${dept.female}Women`}
            </Card>
          ))}
        </div>
      </div>
      {/* workers attendance stat */}
      <div className="flex flex-wrap mt-10 w-full gap-2 ">
        <div className="flex flex-col flex-2 bg-blue-50 overflow-hidden justify-center items-center py-5 px-3 rounded-lg shadow-lg gap-3 border-l-4 border-blue-800">
          <div className="flex flex-wrap items-start w-full ">
            <select
              value={deptSelected}
              onChange={(e) => setDeptSelected(e.target.value)}
            >
              <option value={""}>Choose Dept</option>
              {deptData.map((dept, i) => (
                <option value={dept.dept} key={i}>
                  {dept.dept}
                </option>
              ))}
            </select>
            <div className="ml-5 mb-10">
              {deptSelected && (
                <p className="font-bold text-blue-800">{`Total Number of  ${handleSelectedDept(
                  deptSelected
                )} members`}</p>
              )}
            </div>
          </div>
          <div className="flex  justify-end items-end">
            <BarChartUI data={data} />
          </div>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-3 border-r-4 border-blue-800">
          <p className="text-blue-800 font-bold">Reserved For Children Stat</p>
        </div>
      </div>
      {/* Cards for remaining links */}
      <div className="flex flex-wrap mt-5 gap-4">
        {bottomCardsData.map((bottomInfo, i) => (
          <Card
            key={i}
            shadow="xl"
            title={bottomInfo.title}
            subtitle={bottomInfo.subtititle}
            className="ring-2 ring-blue-800 bg-blue-50 flex-grow-1 basis-[130px]"
          >
            {""}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
