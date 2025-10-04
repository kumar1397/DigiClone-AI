import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

// --- GET ---
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 👈 await it
  try {
    const clone = await prisma.cloneProfile.findUnique({
      where: { clone_id:id },
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
  try {
    const { id } = await params;
    const body = await req.json();
    const updates = {
      tone: body.tone,
      style: body.style,
      catchphrases: body.catchphrases,
      dos: body.dos,
      donts: body.donts,
      freeform_description: body.freeform_description,
    };

    const updatedClone = await prisma.cloneProfile.update({
      where: { clone_id: id },
      data: updates,
      include: { fileUploads: true },
    });

    return NextResponse.json({ success: true, data: updatedClone });
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
