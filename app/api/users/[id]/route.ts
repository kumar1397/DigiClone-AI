import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server"
import { v2 as cloudinary } from "cloudinary"


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  
  try {
    const formData = await req.formData();

    const phone = formData.get("phone");

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, message: "Phone must be a string" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: { phone }, 
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.delete({
      where: { id: params.id },
    })
    return NextResponse.json(
      { success: true, message: "User deleted successfully", data: user },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
