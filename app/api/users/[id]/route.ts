import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // 👈 Promise type
) {
  const { id } = await params; // 👈 await here
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const formData = await req.formData();
    const phone = formData.get("phone");
    const linkedin = formData.get("linkedin");
    const github = formData.get("github");
    const company = formData.get("company");
    const jobrole = formData.get("jobrole");
    const website1 = formData.get("website1");

    if (phone && typeof phone !== "string") {
      return NextResponse.json(
        { success: false, message: "Phone must be a string" },
        { status: 400 }
      );
    }
    if (linkedin && typeof linkedin !== "string") {
      return NextResponse.json(
        { success: false, message: "LinkedIn must be a string" },
        { status: 400 }
      );
    }
    if (company && typeof company !== "string") {
      return NextResponse.json(
        { success: false, message: "Company must be a string" },
        { status: 400 }
      );
    }
    if (jobrole && typeof jobrole !== "string") {
      return NextResponse.json(
        { success: false, message: "Jobrole must be a string" },
        { status: 400 }
      );
    }
    if (github && typeof github !== "string") {
      return NextResponse.json(
        { success: false, message: "GitHub must be a string" },
        { status: 400 }
      );
    }
    if (website1 && typeof website1 !== "string") {
      return NextResponse.json(
        { success: false, message: "Website1 must be a string" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        phone: phone as string,
        linkedin: linkedin as string,
        github: github as string,
        company: company as string,
        jobrole: jobrole as string,
        website1: website1 as string,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Unknown error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const user = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "User deleted successfully", data: user },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}
