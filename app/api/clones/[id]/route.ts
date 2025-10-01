import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

type UploadData = {
  clone_name?: string;
  dos?: string;
  donts?: string;
  freeformDesc?: string;
  image?: string;
};

// --- GET ---
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }   // 👈 Promise type
) {
  const { id } = await params; // 👈 await it
  try {
    const clone = await prisma.cloneProfile.findUnique({
      where: { id },
      include: { fileUploads: true },
    });

    if (!clone) {
      return NextResponse.json(
        { success: false, message: "Clone not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: clone });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}

// --- PUT ---
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const formData = await req.formData();

    const updates: UploadData = {
      clone_name: formData.get("cloneName")?.toString(),
      dos: formData.get("dos")?.toString(),
      donts: formData.get("donts")?.toString(),
      freeformDesc: formData.get("description")?.toString(),
    };

    const imageFile = formData.get("cloneImage") as File | null;
    if (imageFile) {
      updates.image = await uploadFileToCloudinary(imageFile, "clone-images", "image");
    }

    const updatedClone = await prisma.cloneProfile.update({
      where: { id },
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

// --- DELETE ---
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.file.deleteMany({ where: { cloneProfileId: id } });
    await prisma.cloneProfile.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Clone deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, message: "Unknown error" }, { status: 500 });
  }
}
