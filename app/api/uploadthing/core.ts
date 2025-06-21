import { createUploadthing, type FileRouter } from "uploadthing/server";
import { connectDB } from "@/lib/db";
import { File } from "@/models/File";

const f = createUploadthing();

export const uploadRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "8MB" } })
    .onUploadComplete(async ({ file }) => {
      await connectDB();
      await File.create({
        name: file.name,
        url: file.url,
        key: file.key,
        size: file.size,
        type: file.type,
      });
      console.log("File saved:", file.name);
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
