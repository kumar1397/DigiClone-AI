"use server";

import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

type UploadData = {
  url: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
}

export async function uploadPdfFiles(cloneId: string, files: File[]) {
  const uploadedFiles: UploadData[] = [];

  for (const pdf of files) {
    const buffer = Buffer.from(await pdf.arrayBuffer());
    const url = await uploadFileToCloudinary(pdf, "clone-pdfs", "raw");

    let originalName = pdf.name;
    if (pdf.type === "application/pdf" && !originalName.toLowerCase().endsWith(".pdf")) {
      originalName += ".pdf";
    }

    uploadedFiles.push({
      url,
      originalName,
      mimeType: pdf.type,
      fileSize: buffer.length,
    });
  }

  return prisma.cloneProfile.update({
    where: { clone_id: cloneId },
    data: { fileUploads: { create: uploadedFiles } }, // append mode
  });
}

export async function uploadYoutubeLinks(cloneId: string, links: string[]) {
  return prisma.cloneProfile.update({
    where: { clone_id: cloneId },
    data: {
      youtubeLinkUpload: {
        push: links, // append array
      },
    },
  });
}

export async function uploadOtherLinks(cloneId: string, links: string[]) {
  return prisma.cloneProfile.update({
    where: { clone_id: cloneId },
    data: {
      otherLinkUpload: {
        push: links, // append array
      },
    },
  });
}
