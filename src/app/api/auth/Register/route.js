import connectDB from "@/models/connectDB";
const bcrypt = require("bcrypt");
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const { phone, email, pwd, confirmPwd } = await req.json();
    console.log("extracting form data from req body...");

    // check if the password and confirmPassword matches
    if (pwd !== confirmPwd) {
      return NextResponse.json(
        { error: "passwords do not match" },
        { status: 400 }
      );
    }
    console.log(`email: ${email}, pwd: ${pwd}, phone: ${phone}`);

    // check if either email or phone is provided with password
    if (!((email || phone) && pwd)) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone/Email and Password are required",
        },
        { status: 400 }
      );
    }
    console.log("checking to see if user is not already existing...");

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

      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      console.log("registering a user into the database...");

      // Insert the new user into the database ---- USING EMAIL
      const newUser = await User.create({ email: _email, hashedPwd });
      if (!newUser) {
        return NextResponse.json(
          {
            success: false,
            error: `Something went wrong! Try again`,
          },
          { status: 422 }
        );
      }
      console.log("successfully registered... ", newUser);
      return NextResponse.json(
        {
          success: true,
          message: `Registration successful!`,
          data: newUser,
        },
        { status: 201 }
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

      //encrypt the password
      const hashedPwd = await bcrypt.hash(pwd, 10);

      // Insert the new user into the database
      const newUser = await User.create({ phone, hashedPwd });
      if (!newUser) {
        return NextResponse.json(
          {
            success: false,
            error: `Something went wrong! Try again`,
          },
          { status: 400 }
        );
      }
      console.log("successfully registered... ", newUser);
      return NextResponse.json(
        {
          success: true,
          message: `Regisration successful!`,
          data: newUser,
        },
        { status: 201 }
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
