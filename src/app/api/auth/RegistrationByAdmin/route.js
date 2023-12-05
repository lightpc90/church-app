import connectDB from "@/models/connectDB";
const bcrypt = require("bcrypt");
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("entering the api function...");

  try {
    await connectDB();
    const doc = await req.json();
    console.log("extracting form data from req body...");

    console.log(`email: ${doc.email}, pwd: ${doc.pwd}, phone: ${doc.phone}`);

    // check if either email or phone is provided with password
    if (!((doc.email || doc.phone) && doc.firstname && doc.lastname && doc.pwd && doc.dept && doc.gender)) {
      return NextResponse.json(
        {
          success: false,
          error: "Provide all the required",
        },
        { status: 400 }
      );
    }
    console.log("checking to see if user is not already existing...");

    // check to see if the user already existed in the database
    let existingUser;

    // if the user registered using email
    if (doc.email) {
      const _email = doc.email.toLowerCase();
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
    }
      if (doc.phone) {
      existingUser = await User.findOne({ phone: doc.phone });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            error: "Phone number already exists.",
          },
          { status: 400 }
        );
      }
    }

      //encrypt the password
    const hashedPwd = await bcrypt.hash(doc.pwd, 10);
    
    // remove the pwd key from the doc
    delete doc["pwd"];

      console.log("registering a user into the database...");

      // Insert the new user into the database ---- USING EMAIL
      const newUser = await User.create({ ...doc, hashedPwd });
      if (!newUser) {
        return NextResponse.json(
          {
            success: false,
            error: `Failed to create to create a new user! Try again`,
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
