import { NextResponse } from "next/server";
import prisma from "@/prisma";

export default async function fileTraining(clone_id: string) {
    try {
        const cloneProfile = await prisma.cloneProfile.findUnique({
            where: { clone_id: clone_id },
            include: { fileUploads: { orderBy: { uploadDate: "asc" } } }, 
        });

        if (!cloneProfile) {
            return NextResponse.json({ error: "Clone not found" }, { status: 404 });
        }

        const firstFile = cloneProfile.fileUploads[0];

        if (!firstFile) {
            return NextResponse.json({ error: "No files uploaded yet" }, { status: 404 });
        }

        await fetch(`${process.env.NEXT_PUBLIC_FILE_API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clone_id: clone_id,
                clone_name: cloneProfile.clone_name,
                file_name: firstFile.originalName,
                url: firstFile.url,
            }),
        });
        return NextResponse.json({
            success: true,
            message: "First file sent successfully",
            file: firstFile,
        });
    } catch {
        return NextResponse.json("Internal server error", { status: 500 });
    }
}
