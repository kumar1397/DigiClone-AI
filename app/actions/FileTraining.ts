import { NextResponse } from "next/server";
import prisma from "@/prisma";

export default async function fileTraining(clone_id: string) {
    const getErrorMessage = (err: unknown) => {
        if (err instanceof Error) return err.message;
        try {
            return String(err);
        } catch {
            return "Unknown error";
        }
    };

    try {
        const cloneProfile = await prisma.cloneProfile.findUnique({
            where: { clone_id: clone_id },
            include: { fileUploads: { orderBy: { uploadDate: "asc" } } },
        });

        if (!cloneProfile) {
            return NextResponse.json({ error: "Clone not found" }, { status: 404 });
        }

        const files = cloneProfile.fileUploads;

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files uploaded yet" }, { status: 404 });
        }

        const results: Array<{
            id?: string;
            originalName?: string;
            ok: boolean;
            status?: number;
            apiResponse?: unknown;
            error?: string;
        }> = [];

        // Send files one by one (sequentially) and collect results
        for (const f of files) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_FILE_API_URL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        clone_id: clone_id,
                        clone_name: cloneProfile.clone_name,
                        file_name: f.originalName,
                        url: f.url,
                    }),
                });

                let apiResponse: unknown = null;
                try {
                    apiResponse = await res.json();
                } catch (err: unknown) {
                    console.error("Failed to parse file API response for", f.originalName, getErrorMessage(err));
                }

                results.push({
                    id: f.id,
                    originalName: f.originalName,
                    ok: res.ok,
                    status: res.status,
                    apiResponse,
                });

                if (!res.ok) {
                    console.error("File API request failed for", f.originalName, apiResponse || res.status);
                }
            } catch (err: unknown) {
                console.error("Network error sending file", f.originalName, getErrorMessage(err));
                results.push({ id: f.id, originalName: f.originalName, ok: false, error: getErrorMessage(err) });
            }
        }

        const anyFailed = results.some((r) => !r.ok);

        return NextResponse.json({
            success: !anyFailed,
            message: anyFailed ? "Some files failed to send" : "All files sent successfully",
            results,
        }, { status: anyFailed ? 207 : 200 });
    } catch (err: unknown) {
        console.error("Internal server error in fileTraining:", getErrorMessage(err));
        return NextResponse.json("Internal server error", { status: 500 });
    }
}
