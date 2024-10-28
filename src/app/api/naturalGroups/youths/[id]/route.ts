import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await prisma.youth.findUnique({
      where: { id },
    });

    if (!data) {
      return NextResponse.json(
        { success: false, error: "data not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data,
      success: true,
      message: "data fetched!",
    });
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json(
      { success: false, error: "data fetching failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const updated = await prisma.youth.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      data: updated,
      success: true,
      message: "data updated successfully",
    });
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json(
      { success: false, error: "data update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.youth.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "data deleted successfully",
    });
  } catch (e) {
    console.log("server error: ", e);
    return NextResponse.json(
      { success: false, error: "data deletion failed" },
      { status: 500 }
    );
  }
}
