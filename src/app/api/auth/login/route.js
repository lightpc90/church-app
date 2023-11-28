import User from "@/models/User";
import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, phone, pwd } = await req.json();
    let user;

    // check if email or phone and password is entered
    if (!((email || phone) && pwd)) {
      return NextResponse.json(
        { success: false, error: "Please enter email/phone and password" },
        { status: 400 }
      );
    }
    console.log("credentials submitted passed...");

    // connect to database
    await connectDB();
    if (email) {
      const _email = email.toLowerCase();
      console.log("loggin  in with: ", _email);
      // LOGGIN IN WITH EMAIL
      user = await User.findOne({ email: _email });
      console.log("user retrieved using email: ", user);
    } else if (phone) {
      const _phone = phone.toString();
      console.log("loggin in with: ", _phone);
      // LOGGIN IN WITH PHONE
      user = await User.findOne({ phone: _phone });
      console.log("user retrieved using phone: ", user);
    }
    // if no user was found
    if (!user || !user.hashedPwd) {
      console.log("no user or no user hashedPwd: ", user);
      return NextResponse.json(
        { success: false, error: "No user found" },
        { status: 401 }
      );
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(pwd, user.hashedPwd);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect Password",
        },
        { status: 400 }
      );
    }
    // create a token for the user
    const _user = { ...user, hashedPwd: "" };
    const userData = _user._doc
    const _userData = {...userData, hashedPwd: ""}
    console.log("user data passed to accesstoken: ", _userData)
    console.log("user data doc info", _userData)

    //create JWT
    const accessToken = jwt.sign(_userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "356d",
    });

    console.log("access token: ", accessToken)

    // if user found and passwords matched
    return NextResponse.json(
      {
        success: true,
        message: "Successfully logged in",
        accessToken,
        data: _userData,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
  }
}
