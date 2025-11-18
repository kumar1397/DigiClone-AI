import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});
// Helper: extract Cloudinary public ID from URL
function extractPublicId(url: string) {
    try {
        const parts = url.split("/upload/");
        if (parts.length < 2) return null;
        const filePath = parts[1].split(".")[0];
        return filePath.replace(/^v\d+\//, ""); // remove version prefix if exists
    } catch {
        return null;
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // Find file in DB
        const file = await prisma.file.findUnique({
            where: { id },
        });

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        // Extract Cloudinary public ID
        const publicId = extractPublicId(file.url);

        // Delete from Cloudinary if possible
        if (publicId) {
            await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        }

        // Delete from DB
        await prisma.file.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "File deleted successfully",
        });
    } catch {
        return NextResponse.json(
            { error: "Failed to delete file" },
            { status: 500 }
        );
    }
}
