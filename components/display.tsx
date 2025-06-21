"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FileMeta {
  _id: string;
  fileId: string;
  originalName: string;
  size: number;
  uploadedAt: string;
  link: string;
}

export default function UserFiles() {
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const userId = localStorage.getItem("userId");
      console.log(userId);
      if (!userId) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/files/${userId}`);
        const data = await res.json();
        console.log(data);
        setFiles(data);
      } catch (err) {
        console.error("Failed to fetch user files", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Uploaded Files</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading your files...</p>
      ) : files.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">You haven&apos;t uploaded any files yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {files.map((file) => (
            <a
              key={file._id}
              href={file.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="bg-gray-50 h-40 flex items-center justify-center p-4">
                <Image
                  src="/file.svg"
                  alt="File Icon"
                  width={50}
                  height={50}
                  className="opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-3 bg-white">
                <p
                  className="font-medium text-sm text-gray-700 truncate"
                  title={file.originalName}
                >
                  {file.originalName}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Uploaded: {formatDate(file.uploadedAt)}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
