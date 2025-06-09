"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";

export default function UploadOptions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="h-[90%] w-[90%] flex items-center justify-center">
        <div className="p-8 ">
          <h1>Upload Your Files</h1>
          <div className="flex items-center space-x-6">
            {/* Photo Box */}
            <div 
              onClick={() => setIsDialogOpen(true)}
              className="h-[25rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-300 rounded-md cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h2l.4 1M7 5h10l1 2H5.4M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">Files</span>
            </div>

            {/* OR Text */}
            <span className="text-gray-400 text-sm">or</span>

            {/* Video Box */}
            <div 
              onClick={() => setIsDialogOpen(true)}
              className="h-[25rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-300 rounded-md cursor-pointer hover:border-gray-400 hover:text-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 6h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                />
              </svg>
              <span className="text-sm">Links</span>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-6">
          <DialogHeader>
            <DialogTitle className="text-center">Upload Files</DialogTitle>
            <DialogDescription className="text-center">
              Upload your user-downloadable files.
            </DialogDescription>
          </DialogHeader>

          {/* Dropzone Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-md py-10 text-center text-sm text-gray-500">
            <div className="flex flex-col items-center">
              <svg
                className="w-6 h-6 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12"
                />
              </svg>
              <p>
                Drop your files here or{" "}
                <span className="underline cursor-pointer">browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max file size up to 1 GB
              </p>
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="space-y-3 mt-4">
            {/* File 1 */}
            <div className="flex items-center justify-between bg-gray-50 p-2 px-3 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                  PDF
                </div>
                <div>
                  <p className="text-sm font-medium">Product Catalog.pdf</p>
                  <p className="text-xs text-gray-500">20 MB</p>
                </div>
              </div>
              <Trash2 className="text-gray-400 hover:text-red-500 w-4 h-4 cursor-pointer" />
            </div>

            {/* File 2 */}
            <div className="flex items-center justify-between bg-gray-50 p-2 px-3 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                  PDF
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Cinema 4D Project File.zip
                  </p>
                  <p className="text-xs text-gray-500">20 MB</p>
                </div>
              </div>
              <Trash2 className="text-gray-400 hover:text-red-500 w-4 h-4 cursor-pointer" />
            </div>

            {/* Uploading File */}
            <div className="flex items-center justify-between bg-gray-50 p-2 px-3 rounded-md border">
              <div className="flex items-center gap-3 w-full">
                <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                  ZIP
                </div>
                <div className="w-full">
                  <p className="text-sm font-medium">
                    Blender Project File.zip
                  </p>
                  <p className="text-xs text-gray-500">150 MB of 300 MB</p>
                  <div className="w-full bg-gray-200 rounded mt-1 h-1">
                    <div className="bg-black h-1 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
              <X className="text-gray-400 hover:text-red-500 w-4 h-4 cursor-pointer ml-2" />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline">Back</Button>
            <Button>Next</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
