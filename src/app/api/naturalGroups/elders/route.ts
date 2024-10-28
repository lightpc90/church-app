import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.elder.findMany();
    return NextResponse.json({
      data,
      success: true,
      message: "data fetched",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const updated = await prisma.elder.create({
      data,
    });
    return NextResponse.json({
      data: updated,
      success: true,
      message: "data created",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "data creation failed", success: false },
      { status: 500 }
    );
  }
}
