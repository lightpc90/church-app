"use client";

import { useMemo, useState } from "react";
import { AdminPanel, StatCard } from "../AdminCard";
import {
  deptData,
  attendanceData,
  bottomCardsData,
} from "@/components/data/Data";
import { GeneralAttedanceData } from "@/components/data/Data";
import { BarChartUI } from "@/components/customeUI/BarChart";

const Overview = () => {
  const [deptSelected, setDeptSelected] = useState("");

  const handleSelectedDept = (dept: string) =>
    deptData.find((eachDept) => eachDept.dept === dept)?.total;

  // Derived from the selected department; no effect/state round-trip needed.
  const data = useMemo(
    () =>
      deptSelected
        ? attendanceData.map((eachAttendance) => ({
            attendance: eachAttendance[deptSelected].attendance,
            name: eachAttendance[deptSelected].date,
            dept: eachAttendance[deptSelected].dept,
          }))
        : GeneralAttedanceData,
    [deptSelected]
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard accent value="234" label="Total workers" detail="123 men · 104 women" />
        {bottomCardsData.slice(0, 3).map((card) => (
          <StatCard key={card.subtititle} value={card.title} label={card.subtititle} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <AdminPanel className="xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-medium text-ink">Attendance</h2>
              <p className="text-sm text-stone">
                {deptSelected
                  ? `${handleSelectedDept(deptSelected)} members in ${deptSelected}`
                  : "General attendance, last 5 Sundays"}
              </p>
            </div>
            <label className="sr-only" htmlFor="dept-filter">
              Department
            </label>
            <select
              id="dept-filter"
              value={deptSelected}
              onChange={(e) => setDeptSelected(e.target.value)}
              className="h-10 rounded-full border border-line bg-white px-4 text-sm text-ink"
            >
              <option value="">All departments</option>
              {deptData.map((dept) => (
                <option value={dept.dept} key={dept.dept}>
                  {dept.dept}
                </option>
              ))}
            </select>
          </div>
          <BarChartUI data={data} />
        </AdminPanel>

        <AdminPanel>
          <h2 className="font-display text-xl font-medium text-ink">Departments</h2>
          <ul className="mt-4 divide-y divide-line">
            {deptData.map((dept) => (
              <li key={dept.dept} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium text-ink">{dept.dept}</p>
                  <p className="text-xs text-stone">
                    {dept.male} men · {dept.female} women
                  </p>
                </div>
                <span className="font-display text-2xl text-ink tabular-nums">{dept.total}</span>
              </li>
            ))}
          </ul>
        </AdminPanel>
      </div>

      <p className="text-sm text-stone">
        Figures on this page are sample data until attendance tracking is connected.
      </p>
    </div>
  );
};

export default Overview;
