import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// fetch all HFC endpoint funtion
export async function GET() {
  try {
    const data = await prisma.houseFellowship.findMany();
    console.log("HFC data fetched: ", data)
    return NextResponse.json({data, success: true, message: "data fetched"});
  } catch (error) {
    return NextResponse.json(
      {sucess: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// create a new HFC endpoint function
export async function POST(req: Request) {
  
  try {
    const data = await req.json();
    if (!data) {
      throw new Error("Data is empty");
    }
    console.log("data post: ", data);
    const created = await prisma.houseFellowship.create({
      data,
    });
    return NextResponse.json({data: created, success: true, message: "data created"});
  } catch (error) {
    return NextResponse.json(
      {success: false, error: "data creation failed" },
      { status: 500 }
    );
  }
}
