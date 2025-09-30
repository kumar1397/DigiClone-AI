import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const clone = await prisma.cloneProfile.findUnique({
      where: { id: params.id },
      include: { fileUploads: true },
    });

    if (!clone) {
      return NextResponse.json({ success: false, message: "Clone not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: clone });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();

    const updates: any = {
      clone_name: formData.get("cloneName")?.toString(),
      dos: formData.get("dos")?.toString(),
      donts: formData.get("donts")?.toString(),
      freeformDesc: formData.get("description")?.toString(),
    };

    // Replace image if new one provided
    const imageFile = formData.get("cloneImage") as File | null;
    if (imageFile) {
      updates.image = await uploadFileToCloudinary(imageFile, "clone-images", "image");
    }

    const updatedClone = await prisma.cloneProfile.update({
      where: { id: params.id },
      data: updates,
      include: { fileUploads: true },
    });

    return NextResponse.json({ success: true, data: updatedClone });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.file.deleteMany({ where: { cloneId: params.id } });
    await prisma.cloneProfile.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: "Clone deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
