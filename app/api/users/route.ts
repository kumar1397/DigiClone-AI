import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        cloneId: true, // make sure cloneId exists in your schema
      },
    });

    // If not exists, create new user with name + email
    if (!user) {
      user = await prisma.user.create({
        data: { name, email },
        select: {
          id: true,
          name: true,
          email: true,
          cloneId: true,
        },
      });
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}
