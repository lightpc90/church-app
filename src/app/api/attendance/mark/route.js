import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Attendance from "@/models/Attendance";

export async function POST(req) {
  const attendance = await req.json();
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const mark = await Attendance.create(attendance);

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!mark) {
      console.log("Attendance failed to mark");
      return NextResponse.json(
        {
          success: false,
          error: "Atendance failed to mark! Try again",
        },
        { status: 400 }
      );
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("Attendance marked: ", mark);
    return NextResponse.json(
      {
        success: true,
        message: "Attendance Marked Successfully",
        data: mark,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}
