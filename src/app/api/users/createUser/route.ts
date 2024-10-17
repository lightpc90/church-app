
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email } = await req.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(
      { error: "User creation failed" },
      { status: 500 }
    );
  }
}
