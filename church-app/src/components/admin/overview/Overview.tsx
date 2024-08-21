"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import CustomBarChart from "@/components/ui/BarChartRechart";
import { detectContentType } from "next/dist/server/image-optimizer";

enum Depts {
  MEDIA_AND_TECHNICAL = "Media and Technical",
  CHOIR = "Choir",
  USHERING = "Ushering",
  PROTOCOL = "Protocol",
  SANITATION = "Sanitation",
  TEACHERS = "Teachers",
  JESUS_POLIE = "Jesus Police",
}

const deptData = [
  { total: "30", dept: Depts.MEDIA_AND_TECHNICAL, male: "20", female: "20" },
  { total: "58", dept: Depts.CHOIR, male: "20", female: "38" },
  { total: "39", dept: Depts.USHERING, male: "19", female: "20" },
  { total: "27", dept: Depts.PROTOCOL, male: "15", female: "12" },
  { total: "30", dept: Depts.SANITATION, male: "13", female: "17" },
  { total: "32", dept: Depts.TEACHERS, male: "20", female: "12" },
  { total: "18", dept: Depts.JESUS_POLIE, male: "11", female: "7" },
];

export const attendance: {
  [key: string]: { dept: string; attendance: string; date: string };
}[] = [
  {
    [Depts.MEDIA_AND_TECHNICAL]: {
      dept: Depts.MEDIA_AND_TECHNICAL,
      attendance: "23",
      date: "28/08/24",
    },
    [Depts.CHOIR]: { dept: Depts.CHOIR, attendance: "43", date: "28/08/24" },
    [Depts.JESUS_POLIE]: {
      dept: Depts.JESUS_POLIE,
      attendance: "13",
      date: "28/08/24",
    },
    [Depts.PROTOCOL]: {
      dept: Depts.PROTOCOL,
      attendance: "23",
      date: "28/08/24",
    },
    [Depts.SANITATION]: {
      dept: Depts.SANITATION,
      attendance: "22",
      date: "28/08/24",
    },
    [Depts.USHERING]: {
      dept: Depts.USHERING,
      attendance: "25",
      date: "28/08/24",
    },
    [Depts.TEACHERS]: {
      dept: Depts.TEACHERS,
      attendance: "28",
      date: "28/08/24",
    },
  },
  {
    [Depts.MEDIA_AND_TECHNICAL]: {
      dept: Depts.MEDIA_AND_TECHNICAL,
      attendance: "22",
      date: "21/08/24",
    },
    [Depts.CHOIR]: { dept: Depts.CHOIR, attendance: "46", date: "21/08/24" },
    [Depts.JESUS_POLIE]: {
      dept: Depts.JESUS_POLIE,
      attendance: "12",
      date: "21/08/24",
    },
    [Depts.PROTOCOL]: {
      dept: Depts.PROTOCOL,
      attendance: "22",
      date: "21/08/24",
    },
    [Depts.SANITATION]: {
      dept: Depts.SANITATION,
      attendance: "23",
      date: "21/08/24",
    },
    [Depts.USHERING]: {
      dept: Depts.USHERING,
      attendance: "22",
      date: "21/08/24",
    },
    [Depts.TEACHERS]: {
      dept: Depts.TEACHERS,
      attendance: "29",
      date: "21/08/24",
    },
  },
  {
    [Depts.MEDIA_AND_TECHNICAL]: {
      dept: Depts.MEDIA_AND_TECHNICAL,
      attendance: "27",
      date: "14/08/24",
    },
    [Depts.CHOIR]: { dept: Depts.CHOIR, attendance: "46", date: "14/08/24" },
    [Depts.JESUS_POLIE]: {
      dept: Depts.JESUS_POLIE,
      attendance: "12",
      date: "14/08/24",
    },
    [Depts.PROTOCOL]: {
      dept: Depts.PROTOCOL,
      attendance: "27",
      date: "14/08/24",
    },
    [Depts.SANITATION]: {
      dept: Depts.SANITATION,
      attendance: "23",
      date: "14/08/24",
    },
    [Depts.USHERING]: {
      dept: Depts.USHERING,
      attendance: "26",
      date: "14/08/24",
    },
    [Depts.TEACHERS]: {
      dept: Depts.TEACHERS,
      attendance: "25",
      date: "14/08/24",
    },
  },
  {
    [Depts.MEDIA_AND_TECHNICAL]: {
      dept: Depts.MEDIA_AND_TECHNICAL,
      attendance: "29",
      date: "07/08/24",
    },
    [Depts.CHOIR]: { dept: Depts.CHOIR, attendance: "49", date: "07/08/24" },
    [Depts.JESUS_POLIE]: {
      dept: Depts.JESUS_POLIE,
      attendance: "17",
      date: "07/08/24",
    },
    [Depts.PROTOCOL]: {
      dept: Depts.PROTOCOL,
      attendance: "21",
      date: "07/08/24",
    },
    [Depts.SANITATION]: {
      dept: Depts.SANITATION,
      attendance: "24",
      date: "07/08/24",
    },
    [Depts.USHERING]: {
      dept: Depts.USHERING,
      attendance: "23",
      date: "07/08/24",
    },
    [Depts.TEACHERS]: {
      dept: Depts.TEACHERS,
      attendance: "24",
      date: "07/08/24",
    },
  },
  {
    [Depts.MEDIA_AND_TECHNICAL]: {
      dept: Depts.MEDIA_AND_TECHNICAL,
      attendance: "21",
      date: "01/08/24",
    },
    [Depts.CHOIR]: { dept: Depts.CHOIR, attendance: "53", date: "01/08/24" },
    [Depts.JESUS_POLIE]: {
      dept: Depts.JESUS_POLIE,
      attendance: "15",
      date: "01/08/24",
    },
    [Depts.PROTOCOL]: {
      dept: Depts.PROTOCOL,
      attendance: "25",
      date: "01/08/24",
    },
    [Depts.SANITATION]: {
      dept: Depts.SANITATION,
      attendance: "23",
      date: "01/08/24",
    },
    [Depts.USHERING]: {
      dept: Depts.USHERING,
      attendance: "22",
      date: "01/08/24",
    },
    [Depts.TEACHERS]: {
      dept: Depts.TEACHERS,
      attendance: "27",
      date: "01/08/24",
    },
  },
];

const bottomCards = [
  { title: "15", subtititle: "People in Follow-Up List" },
  { title: "10", subtititle: "Unread Testimonies" },
  { title: "13", subtititle: "Unread Prayer Requests" },
  { title: "23", subtititle: "Total Number of House Fellowship Centers" },
];

const Overview = () => {
  const [deptSelected, setDeptSelected] = useState("");
  const initialData = [
    { name: "bar", attendance: "0" },
    { name: "bar", attendance: "0" },
    { name: "bar", attendance: "0" },
    { name: "bar", attendance: "0" },
    { name: "bar", attendance: "0" },
  ];
  const [data, setData] = useState<typeof initialData>(initialData);

  const handleSelectedDept = (dept: string) => {
    const filteredDept = deptData.find((eachDept) => eachDept.dept === dept);
    return filteredDept?.total;
  };

  const getAttendance = () => {
    console.log("running getAttendance...");
    const deptAttendance = attendance.map((eachAttendance) => {
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
        {bottomCards.map((bottomInfo, i) => (
          <Card key={i} shadow="xl" title={bottomInfo.title} subtitle={bottomInfo.subtititle} className="ring-2 ring-blue-800">
            {""}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
