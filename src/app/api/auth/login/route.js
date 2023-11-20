import User from "@/models/User";
import connectDB from "@/models/connectDB";
import { NextResponse } from "next/server";
import { jwt } from "jsonwebtoken";

export async function POST (req){
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
    user = User.findOne({ email: email.toLowerCase() });
  } else if (phone) {
    user = User.findOne({ phone });
  }
  // if no user was found
  if (!user || !user.hashedPwd) {
    console.log('user: ', user, ' hashedPwd: ', user.hashedPwd)
    return NextResponse.json(
      { success: false, error: "No user found" },
      { status: 401 }
    );
  }

  // check if password exist
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
  const userData = { ...user, hashedPwd: "" };

  //create JWT
  const accessToken = jwt.sign(userData, process.env?.ACCESS_TOKEN_SECRET, {
    expiresIn: "356d",
  });

  // if user found and passwords matched
  return NextResponse.json(
    {
      success: true,
      message: "Successfully logged in",
      accessToken,
      data: userData,
    },
    { status: 201 }
  );
};

