import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RefreshCw, Trash2, MessageCircle, File, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
interface Clone {
  clone_id: string;
  clone_name: string;
  status: string;
  createdAt: string;
  user_email: string;
  clone_intro: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const AdminClones = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClone, setSelectedClone] = useState<Clone | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [clones, setClones] = useState<Clone[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  async function fetchClones() {
    const response = await fetch('/api/clones');
    const data = await response.json();
    setClones(data.data);
  }
  useEffect(() => {
    fetchClones();
  }, []);

  const filteredClones = clones.filter(clone =>
    clone.clone_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clone.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">🟢 Live</Badge>;
      case "training":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">🟡 Training</Badge>;
      case "pending":
        return <Badge variant="destructive">🔴 Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewClone = (clone: Clone) => {
    setSelectedClone(clone);
    setShowDialog(true);
  };

  const handleFileUpload = async () => {
    setUploadDialogOpen(false);
    const id = selectedClone?.clone_id;
    if (!id || uploadedFiles.length === 0) {
      console.error("Missing clone_id or file");
      return;
    }

    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("fileUploads", file.file);
    });


    try {
      const res = await fetch(`/api/upload/${selectedClone?.clone_id}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      toast.success("File uploaded successfully!");
      await fetchClones();

    } catch (err) {
      console.error("File upload failed:", err);
    }
  };



  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type.split("/")[1].toUpperCase(),
      file: file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 1024 * 1024,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Clone Management</h1>
        <p className="text-muted-foreground mt-1">Monitor, retrain, and manage all clones</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search clones by name or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clones Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clones ({filteredClones.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Clone Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Creator</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created On</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClones.map((clone, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50">
                    <td className="py-3 px-4 font-medium">{clone.clone_name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{clone.user_email}</td>
                    <td className="py-3 px-4">{getStatusBadge(clone.status)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{new Date(clone.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClone(clone)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clone Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Clone Details</DialogTitle>
            <DialogDescription>View and manage clone information</DialogDescription>
          </DialogHeader>
          {selectedClone && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Clone Name</p>
                  <p className="font-medium">{selectedClone.clone_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Creator</p>
                  <p className="font-medium">{selectedClone.user_email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedClone.clone_intro}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedClone.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p className="font-medium">{new Date(selectedClone.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}</p>
                </div>
              </div>

            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
            <Button onClick={() => setUploadDialogOpen(true)}>
              <File size={16} />
              Upload File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload your user-downloadable files.
            </DialogDescription>
          </DialogHeader>

          {/* Dropzone Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : ""
              }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">
              {isDragActive ? (
                "Drop the files here..."
              ) : (
                <>
                  Drop your files here or{" "}
                  <span className="text-primary underline">
                    browse
                  </span>
                </>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              Max file size up to 1 GB
            </p>
          </div>
          {uploadedFiles.length > 0 && (
            <div className="space-y-3 mt-4">
              <h4 className="font-medium text-sm">Uploaded Files:</h4>
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-muted p-3 rounded-md border"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-xs text-primary px-2 py-1 rounded">
                      {file.type}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setUploadDialogOpen(false)}
            >
              Back
            </Button>
            <Button onClick={handleFileUpload}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default AdminClones;
