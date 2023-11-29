import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req) {
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const allUsers = await User.find({}).select(
      "_id firstname lastname phone email username birthdayMonth birthDay dept gender residentialAddress verified role"
    );

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!allUsers) {
      console.log("No users Registered");
      return NextResponse.json({
        success: false,
        error: "No user Registered",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("all users returned: ", allUsers);
    return NextResponse.json({
      success: true,
      message: "user info returned",
      data: allUsers,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
