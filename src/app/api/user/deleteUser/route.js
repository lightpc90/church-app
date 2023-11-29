import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function POST(req) {
  const { _id } = await req.json();
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const deletedDoc = await User.deleteOne({ _id });

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (deletedDoc.deletedCount !== 1) {
      console.log("Failed to delete user");
      return NextResponse.json({
        success: false,
        error: "Failed to delete user!",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    return NextResponse.json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
