"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Upload, Link, Plus, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function UploadOptions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [links, setLinks] = useState([{ id: 1, value: '' }]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1].toUpperCase(),
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * 1024, 
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addLink = () => {
    setLinks([...links, { id: links.length + 1, value: '' }]);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: number, value: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, value } : link
    ));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append('files', file.file);
      });
  
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId) {
        alert('User ID not found. Please log in again.');
        return;
      }
      
      if (!token) {
        alert('Authentication token not found. Please log in again.');
        return;
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/files?userId=${userId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized. Please log in again.');
        } else {
          throw new Error(`Upload failed: ${response.status}`);
        }
        return;
      }
      setIsDialogOpen(false);
      setUploadedFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Upload failed. Please try again.');
    }
  };
  

  const handleLinks = async () => {
    try {
      // Filter out empty links
      const validLinks = links.filter(link => link.value.trim() !== '');
      
      if (validLinks.length === 0) {
        alert('Please add at least one valid link');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ links: validLinks })
      });

      if (!response.ok) {
        throw new Error('Failed to submit links');
      }
      setIsShareDialogOpen(false);
      setLinks([{ id: 1, value: '' }]); // Reset to initial state
    } catch (error) {
      console.error('Error submitting links:', error);
      // You might want to add proper error handling here
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Your Files</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose how you want to share your content. Upload files directly or share via links.
          </p>
        </div>

        <div className="flex items-center justify-center gap-8">
          {/* File Upload Box */}
          <div
            onClick={() => setIsDialogOpen(true)}
            className="group h-[25rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 rounded-xl cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <Upload className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                <p className="text-sm text-gray-500">Share files directly from your device</p>
              </div>
            </div>
          </div>

          {/* OR Text */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm text-gray-500">or</span>
            </div>
          </div>

          {/* Link Box */}
          <div
            onClick={() => setIsShareDialogOpen(true)}
            className="group h-[25rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 rounded-xl cursor-pointer hover:border-green-500 hover:text-green-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                <Link className="h-8 w-8" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Share Links</h3>
                <p className="text-sm text-gray-500">Share content via URLs</p>
              </div>
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
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed border-gray-300 rounded-md py-10 text-center text-sm text-gray-500 cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <input {...getInputProps()} />
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
                {isDragActive ? (
                  "Drop the files here..."
                ) : (
                  <>
                    Drop your files here or{" "}
                    <span className="underline">browse</span>
                  </>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max file size up to 1 GB
              </p>
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="space-y-3 mt-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between bg-gray-50 p-2 px-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                    {file.type}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <Trash2 
                  className="text-gray-400 hover:text-red-500 w-4 h-4 cursor-pointer" 
                  onClick={() => removeFile(file.id)}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Back</Button>
            <Button 
              onClick={handleUpload}
              disabled={uploadedFiles.length === 0}
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[450px] p-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add Links</DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              Add the links you want to share
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            {links.map((link) => (
              <div key={link.id} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter link URL"
                  value={link.value}
                  onChange={(e) => updateLink(link.id, e.target.value)}
                />
                {links.length > 1 && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeLink(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              onClick={addLink}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Link
            </Button>
          </div>

          <Button
            className="mt-6 bg-green-500 hover:bg-green-600 w-full py-6 text-base font-medium"
            onClick={handleLinks}
          >
            Submit 
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
