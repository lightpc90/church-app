import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    //   WHEN NO USER ID IS SENT FROM THE CLIENT SIDE
    if (!id) {
      return NextResponse.json({ success: false, error: "No currentUserId" });
    }

    //   FIND THE USER INFO USING THE USER ID
    const userInfo = await User.findById(id);

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!userInfo) {
      console.log("No user with such Id");
      return NextResponse.json({
        success: false,
        error: "No user with such ID",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "user info returned",
      data: userInfo,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
