import connectDB from "@/models/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const { phone, email } = await req.json();
    console.log("extracting form data from req body...");

    // check if either email or phone is provided with password
    if (!(email || phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "no phone or password supplied",
        },
        { status: 400 }
      );
    }
    console.log("checking to see if ID is not already existing...");

    // check to see if the user already existed in the database
    let existingUser;

    // if the user registered using email
    if (email) {
      const _email = email.toLowerCase();
      existingUser = await User.findOne({ email: _email });
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Email already exists.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `ID can be added`,
        },
        { status: 200 }
      );
    }

    // if the user registered USING PHONE
    else if (phone) {
      existingUser = await User.findOne({ phone });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Phone number already exists.",
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: true,
          message: `ID can be added!`,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        success: false,
        error: `internal server error ${err}`,
      },
      { status: 500 }
    );
  }
}
