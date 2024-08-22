// components/BarChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = [
//   { name: "4 Sundays Ago", Attendance: 4000 },
//   { name: "3 Sundays Ago", Attendance: 3000 },
//   { name: "2 Sundays Ago", Attendance: 2000 },
//   { name: "Last Sunday", Attendance: 2780 },
//   { name: "This Sunday", Attendance: 1890 },
// ];

type Data = {
  data: {
    name: string;
    attendance: string;
  }[];
};

const CustomBarChart = ({ data }: Data) => (
  <BarChart width={700} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="attendance" fill="#1e40af" />
  </BarChart>
);

export default CustomBarChart;
