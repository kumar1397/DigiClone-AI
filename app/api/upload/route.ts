import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "clone-images";
    const type = (formData.get("type") as "image" | "raw") || "image";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const url = await uploadFileToCloudinary(file, folder, type);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
