import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { accessToken } = await req.json();

  try {
    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: "No access token" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return NextResponse.json({ success: true, decoded }, { status: 200 }); // Return decoded token if it's valid
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json(
      { success: false, error: "invalid token" },
      { status: 400 }
    );
  }
}
