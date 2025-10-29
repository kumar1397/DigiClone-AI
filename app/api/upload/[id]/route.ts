import { NextResponse, NextRequest } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import prisma from "@/prisma";
import fileTraining from "@/app/actions/FileTraining";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const files = formData.getAll("fileUploads") as File[];

    if (!id || files.length === 0) {
      return NextResponse.json(
        { error: "Missing file(s) or clone_id" },
        { status: 400 }
      );
    }

    const cloneProfile = await prisma.cloneProfile.findUnique({
      where: { clone_id: id },
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

    const res = await fileTraining(id);

    if (res.status === 200) {
      return NextResponse.json({ success: true, message: "Files uploaded and training started", files: uploadedFiles });
    }

    return NextResponse.json({
      success: true,
      message: "Files uploaded but training failed to start",
      files: uploadedFiles,
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
