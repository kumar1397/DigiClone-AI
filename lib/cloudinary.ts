import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadFileToCloudinary(
  file: File,
  folder: string,
  type: "image" | "raw"
) {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadRes = await cloudinary.uploader.upload(
      `data:${file.type};base64,${buffer.toString("base64")}`,
      {
        folder,
        resource_type: type, // "image" or "raw"
      }
    );

    return uploadRes.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary upload failed:", err);
    throw err;
  }
}
