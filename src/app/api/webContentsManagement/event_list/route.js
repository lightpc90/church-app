import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Event from "@/models/Event";

export async function GET(req) {
  try {
    await connectDB();

    //   FIND THE USER INFO USING THE USER ID
    const allEvents = await Event.find({})

    //   WHEN NO USER INFO IS RETURN FROM THE DATABASE
    if (!allEvents) {
      console.log("No Event Published Yet");
      return NextResponse.json({
        success: false,
        error: "No Published Event",
      });
    }
    //   WHEN A USER INFO IS RETURNED FROM THE DATABASE
    console.log("all events: ", allEvents);
    return NextResponse.json({
      success: true,
      message: "fetched events successfully",
      data: allEvents,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json({
      success: false,
      error: err.message || "Something went wrong",
    });
  }
}
