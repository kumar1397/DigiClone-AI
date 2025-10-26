import { NextResponse, NextRequest } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import prisma from "@/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ clone_id: string }> }
) {
  try {
    const { clone_id } = await params;
    const formData = await req.formData();
    const files = formData.getAll("fileUploads") as File[];

    if (!clone_id || files.length === 0) {
      return NextResponse.json(
        { error: "Missing file(s) or clone_id" },
        { status: 400 }
      );
    }

    const cloneProfile = await prisma.cloneProfile.findUnique({
      where: { clone_id },
    });

    if (!cloneProfile) {
      return NextResponse.json({ error: "Clone not found" }, { status: 404 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadFileToCloudinary(file, "clone-pdfs", "raw");

      let originalName = file.name;
      if (
        file.type === "application/pdf" &&
        !originalName.toLowerCase().endsWith(".pdf")
      ) {
        originalName += ".pdf";
      }

      // Save metadata in DB
      const newFile = await prisma.file.create({
        data: {
          url,
          originalName,
          fileSize: buffer.length,
          mimeType: file.type,
          cloneProfileId: cloneProfile.id,
        },
      });

      uploadedFiles.push(newFile);
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error("File upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
