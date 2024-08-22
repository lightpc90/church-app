"use client";

import { useEffect, useState } from "react";
import Card from "@/components/customeUI/Card";
import CustomBarChart from "@/components/customeUI/BarChartRechart";
import { deptData, attendanceData, bottomCardsData, attendanceInitData } from "@/components/data/Data";


const Overview = () => {
  const [deptSelected, setDeptSelected] = useState("");
  
  const [data, setData] = useState<typeof attendanceInitData>(attendanceInitData);

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
    <div className="mx-10">
      {/* Title */}
      <p className="text-2xl font-bold p-2 text-blue-800 ">Overview</p>
      {/* Cards container */}
      <div className="flex flex-wrap gap-2 lg:gap-4">
        <Card
          title="234"
          subtitle="Total number of Workers"
          className="bg-zinc-300 text-blue-800 border-l-4 border-blue-800 shadow-lg"
        >
          123Men, 104Women
        </Card>
        {deptData.map((dept, i) => (
          <Card
            key={i}
            title={dept.total}
            subtitle={dept.dept}
            rounded="md"
            className="font-seminbold shadow-lg"
          >
            {`${dept.male}Men, ${dept.female}Women`}
          </Card>
        ))}
      </div>
      {/* workers attendance stat */}
      <div className="flex mt-10 w-full gap-2 ">
        <div className="flex flex-col flex-2 bg-white h-[430px] justify-center items-center py-5 px-3 rounded-lg shadow-lg gap-3 border-l-4 border-blue-800">
          <div className="flex items-start w-full ">
            <select
              value={deptSelected}
              onChange={(e) => setDeptSelected(e.target.value)}
            >
              <option value="">Choose Dept</option>
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
              <p>Attendance of Workers in each Dept in the last 5 Sundays</p>
            </div>
          </div>
          <CustomBarChart data={data} />
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg"></div>
      </div>
      {/* Cards for remaining links */}
      <div className="flex flex-wrap mt-5 gap-4">
        {bottomCardsData.map((bottomInfo, i) => (
          <Card key={i} shadow="xl" title={bottomInfo.title} subtitle={bottomInfo.subtititle} className="ring-2 ring-blue-800">
            {""}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
