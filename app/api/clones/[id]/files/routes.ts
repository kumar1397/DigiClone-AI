import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

type UploadData = {
  url: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
}

export async function FileUpload(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const formData = await req.formData();

    // Collect uploaded PDFs
    const uploadedFiles: UploadData[] = [];
    const pdfFiles = formData.getAll("fileUploads") as File[];

    for (const pdf of pdfFiles) {
      const url = await uploadFileToCloudinary(pdf, "clone-pdfs", "raw");
      const buffer = Buffer.from(await pdf.arrayBuffer());

      let originalName = pdf.name;
      if (
        pdf.type === "application/pdf" &&
        !originalName.toLowerCase().endsWith(".pdf")
      ) {
        originalName += ".pdf";
      }

      uploadedFiles.push({
        url,
        originalName,
        mimeType: pdf.type,
        fileSize: buffer.length,
      });
    }

    // Append new files (without deleting old ones)
    const updatedClone = await prisma.cloneProfile.update({
      where: { clone_id: id },
      data: {
        fileUploads: {
          create: uploadedFiles, // ✅ appends to existing files
        },
      },
      include: { fileUploads: true }, // ✅ return updated list
    });

    return NextResponse.json({ success: true, data: updatedClone }, { status: 200 });
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

export async function youtubeLinkUpload(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const { youtubeLinks } = body;

    if (!Array.isArray(youtubeLinks) || youtubeLinks.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid YouTube links" },
        { status: 400 }
      );
    }

    const updatedClone = await prisma.cloneProfile.update({
      where: { clone_id: id },
      data: {
        youtubeLinkUpload: {
          push: youtubeLinks, // ✅ appends whole array
        },
      },
      include: { fileUploads: true },
    });

    return NextResponse.json({ success: true, data: updatedClone }, { status: 200 });
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

export async function otherLinkUpload(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const { otherLinks } = body;

    if (!Array.isArray(otherLinks) || otherLinks.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid links" },
        { status: 400 }
      );
    }

    const updatedClone = await prisma.cloneProfile.update({
      where: { clone_id: id },
      data: {
        otherLinkUpload: {
          push: otherLinks, // ✅ appends multiple links
        },
      },
      include: { fileUploads: true },
    });

    return NextResponse.json({ success: true, data: updatedClone }, { status: 200 });
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
