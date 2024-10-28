// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.followUp.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json({ error: "data not found", success: false }, { status: 404 });
    }

    return NextResponse.json({data, success: true, message: "data created"});
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json({
      success: true,
      message: "data fetching failed",
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const updated = await prisma.followUp.update({
      where: { id },
      data
    });

    return NextResponse.json({data: updated, success: true, message: "data updated"});
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json({
      success: true,
      message: "data update failed",
    });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.followUp.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "data deleted successfully",
    });
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json({
      success: false,
      error: "data deletion failed",
    });
  }
}
