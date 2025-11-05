import { NextResponse } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import prisma from "@/prisma";
import fileTraining from "@/app/actions/FileTraining";
import { Status } from "@prisma/client";

export async function POST(req: Request) {
    try {
        // Parse form data sent from client
        const formData = await req.formData();
        const cloneId = formData.get("cloneId") as string;
        const files = formData.getAll("files") as File[];

        if (!cloneId || files.length === 0) {
            return NextResponse.json(
                { success: false, message: "Missing cloneId or files" },
                { status: 400 }
            );
        }

        const uploadedFiles: {
            url: string;
            originalName: string;
            mimeType: string;
            fileSize: number;
        }[] = [];

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

        const updatedClone = await prisma.cloneProfile.update({
            where: { clone_id: cloneId },
            data: { fileUploads: { create: uploadedFiles } },
            include: { fileUploads: true },
        });

        if (!updatedClone) {
            return NextResponse.json(
                { success: false, message: "Clone profile not found" },
                { status: 404 }
            );
        }

        try {
            const res = await fileTraining(cloneId);
            const data = await res.json();

            if (data.success) {
                await prisma.cloneProfile.update({
                    where: { clone_id: cloneId },
                    data: { status: Status.live },
                });
                return NextResponse.json(
                    { success: true, message: "Files uploaded successfully and training started" },
                    { status: 200 }
                );
            } else {
                return NextResponse.json(
                    { success: false, message: "Files uploaded successfully but training failed to start" },
                    { status: 201 }
                );
            }
        } catch (err) {
            console.error(err);
            return NextResponse.json(
                { success: false, message: "Files uploaded but training request failed" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, message: "File upload failed" },
            { status: 500 }
        );
    }
}
