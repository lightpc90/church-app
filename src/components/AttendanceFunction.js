"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/globalState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const AttendanceFunction = () => {
  // object to store marked userIds
  let attendanceObject = {};
  const router = useRouter();
  const { currentUserId, accessToken, attendanceObj, setAttendanceObj, userData } =
    useAuth();

  // verify it's an authenticated user
  if (!accessToken) {
    toast.error("Please login");
    router.push("/login");
  }

  const [marking, setMarking] = useState(false);

  // attendance doc to send to the attendance api
  const doc = { attended: true, userId: currentUserId };

  const markAttendance = async () => {
    setMarking(true);
    const res = await fetch("/api/attendance/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    if (!res.ok) {
      toast.error("Request Error");
      setMarking(false);
      return;
    }

    const attendance = await res.json();
    if (!attendance.success) {
      toast.error(attendance.error);
    } else if (attendance.success) {
      const userId = attendance.data.userId;
      attendanceObject[userId] = true;
      setAttendanceObj({ ...attendanceObj, ...attendanceObject });
      toast.success(attendance.message);
      router.push("/");
    }
    setMarking(false);
  };

  useEffect(() => {
    // if the user id is included in the attendance object
    if (attendanceObj[currentUserId]) {
      toast.error("Attendance Already Marked");
      router.push("/");
    }
    markAttendance();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="text-xl lg:text-2xl font-bold">
        Workers Meeting Attendance
      </div>
      <p className="p-2">{`Hi, ${userData.firstname}`}</p>
      {marking ? (
        <p className="flex justify-center items-center font-semibold text-xl lg:text-2xl">
          Wait! Attendance being marked...
        </p>
      ) : (
        <p className="flex justify-center items-center font-semibold text-xl lg:text-2xl">
          Workers Meeting Attendance Page. Refresh Page if Marking Failed
        </p>
      )}
    </div>
  );
};

export default AttendanceFunction;
