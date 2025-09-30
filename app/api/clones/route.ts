import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma";
import { uploadFileToCloudinary } from "@/lib/cloudinary";


function toArray(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  const str = value.toString();
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [str]; // if plain string
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const userId = formData.get("userId")?.toString();
    if (!userId) {
      return NextResponse.json({ success: false, message: "UserId missing" }, { status: 400 });
    }

    const cloneName = formData.get("clone_name")?.toString() ?? "Untitled Clone";
    const tone = toArray(formData.get("tone"));
    const style = toArray(formData.get("style"));
    const values = toArray(formData.get("values"));
    const catchphrases = toArray(formData.get("catchphrases"));
    const dos = formData.get("dos")?.toString() ?? "";
    const donts = formData.get("donts")?.toString() ?? "";
    const description = formData.get("freeform_description")?.toString() ?? "";
    const youtubeLinks = toArray(formData.get("youtubeLinkUpload"));
    const otherLinks = toArray(formData.get("otherLinkUpload"));

    // Upload image
    let imageUrl = `newPic.jpg`; 
    const imageFile = formData.get("image") as File | null;

    if (imageFile) {
      try {
        imageUrl = await uploadFileToCloudinary(imageFile, "clone-images", "image");
      } catch (err) {
        console.error("❌ Image upload failed:", err);
      }
    }

    // Upload PDFs
    const uploadedFiles: any[] = [];
    const pdfFiles = formData.getAll("fileUploads") as File[];

    for (const pdf of pdfFiles) {
      const url = await uploadFileToCloudinary(pdf, "clone-pdfs", "raw");
      const buffer = Buffer.from(await pdf.arrayBuffer());
      uploadedFiles.push({
        url,
        originalName: pdf.name,
        mimeType: pdf.type,
        fileSize: buffer.length,
      });
    }

    // Save clone
    const newClone = await prisma.cloneProfile.create({
      data: {
        clone_id: `clone_u_${Math.random().toString(16).substring(2, 14)}`,
        clone_name: cloneName,
        tone,
        style,
        values,
        catchphrases,
        dos,
        donts,
        freeform_description: description,
        youtubeLinkUpload: youtubeLinks,
        otherLinkUpload: otherLinks,
        image: imageUrl,
        fileUploads: { create: uploadedFiles },
      },
      include: { fileUploads: true },
    });

    // 🔑 Update User with cloneId
    await prisma.user.update({
      where: { id: userId },
      data: { cloneId: newClone.id },
    });

    console.log("🎉 Created clone with files:", newClone);

    return NextResponse.json({ success: true, data: newClone }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating clone:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}



export async function GET() {
  try {
    const clones = await prisma.cloneProfile.findMany({
      include: { fileUploads: true },
    });
    return NextResponse.json({ success: true, data: clones });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
