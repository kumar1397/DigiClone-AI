import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

type UploadData = {
  clone_name?: string;
  dos?: string;
  donts?: string;
  freeformDesc?: string;
  image?: string;
}
export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const clone = await prisma.cloneProfile.findUnique({
      where: { id: id },
      include: { fileUploads: true },
    });

    if (!clone) {
      return NextResponse.json({ success: false, message: "Clone not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: clone });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    const formData = await req.formData();

    const updates: UploadData = {
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
      where: { id: id },
      data: updates,
      include: { fileUploads: true },
    });

    return NextResponse.json({ success: true, data: updatedClone });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  try {
    await prisma.file.deleteMany({ where: { cloneProfileId: id } });
    await prisma.cloneProfile.delete({ where: { id: id } });

    return NextResponse.json({ success: true, message: "Clone deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}
