import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import Event from "@/models/Event";

export async function POST(req) {
  const eventDoc = await req.json();
  try {
    await connectDB();

    //  CREATE A NEW EVENT ENTRY
    const newEvent = await Event.create(eventDoc);

    //   WHEN NO EVENT IS RETURNED FROM THE DATABASE
    if (!newEvent) {
      console.log("Event failed to publish");
      return NextResponse.json(
        {
          success: false,
          error: "Event failed to publish!",
        },
        { status: 400 }
      );
    }
    //   WHEN AN EVENT INFO IS RETURNED FROM THE DATABASE
    console.log("new event added: ", newEvent);
    return NextResponse.json(
      {
        success: true,
        message: "Event Published Successfully",
        data: newEvent,
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
