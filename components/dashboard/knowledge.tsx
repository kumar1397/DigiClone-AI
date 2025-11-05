
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Upload,
    Trash2,
    FileText
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

interface UploadedFile {
    id: string;
    fileId: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    url: string;
    file: File;
}


interface CloneData {
    clone_id: string;
    clone_name: string;
    catchphrases: string[];
    dos: string;
    donts: string;
    freeform_description: string;
    image: string;
    style: string[];
    tone: string[];
    values: string[];
    youtubeLinkUpload: string[];
    otherLinkUpload: string[];
    Status: string;
    fileUploads?: UploadedFile[];
}

interface KnowledgeProps {
    cloneId: string;
    cloneData: CloneData;
}

export default function Knowledge({ cloneId, cloneData }: KnowledgeProps) {
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    // const [linksDialogOpen, setLinksDialogOpen] = useState(false);
    // const [youtubeLinksDialogOpen, setYoutubeLinksDialogOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploadSources, setUploadSources] = useState<UploadedFile[]>([]);
    useEffect(() => {
        if (cloneData.fileUploads) {
            setUploadSources(cloneData.fileUploads);
        }
    }, [cloneData.fileUploads]);
    // const handleAddLink = () => {
    //     setLinks([...links, ""]);
    // };

    // const handleLinkChange = (index: number, value: string) => {
    //     const newLinks = [...links];
    //     newLinks[index] = value;
    //     setLinks(newLinks);
    // };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => {
            const uniqueId = Math.random().toString(36).substr(2, 9);

            return {
                id: uniqueId,
                fileId: uniqueId,
                originalName: file.name,
                fileSize: file.size,
                mimeType: file.type,
                url: "",
                file: file,
            } as UploadedFile;
        });

        setUploadedFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxSize: 1024 * 1024 * 1024,
    });

    const removeFile = (id: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // const handleRemoveLink = (index: number) => {
    //     setLinks(links.filter((_, i) => i !== index));
    // };

    // const handleAddYoutubeLink = () => {
    //     setYoutubeLinks([...youtubeLinks, ""]);
    // };

    // const handleYoutubeLinkChange = (index: number, value: string) => {
    //     const newYoutubeLinks = [...youtubeLinks];
    //     newYoutubeLinks[index] = value;
    //     setYoutubeLinks(newYoutubeLinks);
    // };

    // const handleRemoveYoutubeLink = (index: number) => {
    //     setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
    // }

    const handleFileUpload = async () => {
        setUploadDialogOpen(false);
        const toastId = toast.loading("Uploading files...");

        try {
            const formData = new FormData();
            formData.append("cloneId", cloneId);
            uploadedFiles.forEach(f => formData.append("files", f.file));

            const res = await fetch("/api/upload/files", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data.success) {
                toast.error(data.message, { id: toastId });
                return;
            }

            toast.success(data.message, { id: toastId });
            setUploadedFiles([]);
        } catch {
            toast.error("Failed to upload files", { id: toastId });
        }
    };


    //     setYoutubeLinksDialogOpen(false);
    //     const toastId = toast.loading("Uploading files...");

    //     try {
    //         await uploadYoutubeLinks(cloneId, youtubeLinks);
    //         toast.success("YouTube links uploaded successfully!", { id: toastId });
    //         setYoutubeLinks([]);
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Failed to upload YouTube links", { id: toastId });
    //     }
    // };

    // const handleOtherLinkUplaod = async () => {
    //     setLinksDialogOpen(false);
    //     const toastId = toast.loading("Uploading files...");
    //     try {
    //         await uploadOtherLinks(cloneId, links);
    //         toast.success("Links uploaded successfuLlly!", { id: toastId });
    //         setLinks([]);
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("oad links", { id: toastId });
    //     }
    // };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-serif">
                        Share Your Content
                    </CardTitle>
                    <CardDescription>
                        Choose how you want to share your content. Upload files
                        directly, share YouTube videos, or share other links.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-1">
                        <Dialog
                            open={uploadDialogOpen}
                            onOpenChange={setUploadDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-semibold text-lg mb-2">
                                        Upload Files
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Share files directly from your device
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Upload Files</DialogTitle>
                                    <DialogDescription>
                                        Upload your user-downloadable files.
                                    </DialogDescription>
                                </DialogHeader>

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

                                {/* Uploaded Files List */}
                                {uploadedFiles.length > 0 && (
                                    <div className="space-y-3 mt-4">
                                        <h4 className="font-medium text-sm">Uploaded Files:</h4>
                                        {uploadedFiles.map((file) => (
                                            <div
                                                key={file.id}
                                                className="flex items-center justify-between bg-muted p-3 rounded-md border"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <p className="text-sm font-medium">
                                                            {file.originalName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatFileSize(file.fileSize)}
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

                        {/* <Dialog
                            open={youtubeLinksDialogOpen}
                            onOpenChange={setYoutubeLinksDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                                    <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-semibold text-lg mb-2">
                                        YouTube Links
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Share YouTube videos
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add YouTube Links</DialogTitle>
                                    <DialogDescription>
                                        Add YouTube video URLs you want to share
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    {youtubeLinks.map((link, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={link}
                                                onChange={(e) =>
                                                    handleYoutubeLinkChange(index, e.target.value)
                                                }
                                                placeholder="Enter YouTube URL"
                                            />
                                            {youtubeLinks.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleRemoveYoutubeLink(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={handleAddYoutubeLink}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Another YouTube Link
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleYoutubeLinkUpload}
                                    className="w-full bg-red-600 hover:bg-red-700"
                                >
                                    Done
                                </Button>
                            </DialogContent>
                        </Dialog>

                        <Dialog
                            open={linksDialogOpen}
                            onOpenChange={setLinksDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                                    <LinkIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="font-semibold text-lg mb-2">
                                        Other Links
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        Share other content via URLs
                                    </p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add Other Links</DialogTitle>
                                    <DialogDescription>
                                        Add other links you want to share (articles, documents,
                                        etc.)
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    {links.map((link, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={link}
                                                onChange={(e) =>
                                                    handleLinkChange(index, e.target.value)
                                                }
                                                placeholder="Enter link URL"
                                            />
                                            {links.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleRemoveLink(index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={handleAddLink}
                                        className="w-full"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Another Link
                                    </Button>
                                </div>
                                <Button
                                    onClick={handleOtherLinkUplaod}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    Done
                                </Button>
                            </DialogContent>
                        </Dialog> */}
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4">
                <h4 className="font-semibold">Uploaded Sources ({uploadSources.length})</h4>
                <div className="space-y-2">
                    {uploadSources.map((source) => (
                        <div
                            key={source.id}
                            className="flex items-center justify-between p-3 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3 w-full">
                                <div className="p-2 bg-primary/10 rounded">
                                    <FileText className="h-4 w-4 text-primary" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{source.originalName}</p>
                                </div>

                                <a
                                    href={`${source.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View PDF
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="space-y-4">
                <h4 className="font-semibold">
                    Youtube Links ({cloneData.youtubeLinkUpload.length})
                </h4>

                <div className="flex flex-wrap gap-3">
                    {cloneData.youtubeLinkUpload.map((url, index) => {
                        const validUrl = url.startsWith("http://") || url.startsWith("https://")
                            ? url
                            : `https://${url}`;

                        return (
                            <a
                                key={index}
                                href={validUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 transition"
                            >
                                {validUrl}
                            </a>
                        );
                    })}
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="font-semibold">
                    Other Links ({cloneData.otherLinkUpload.length})
                </h4>

                <div className="flex flex-wrap gap-3">
                    {cloneData.otherLinkUpload.map((url, index) => {
                        const validUrl = url.startsWith("http://") || url.startsWith("https://")
                            ? url
                            : `https://${url}`;

                        return (
                            <a
                                key={index}
                                href={validUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg border px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-800 transition"
                            >
                                {validUrl}
                            </a>
                        );
                    })}
                </div>
            </div> */}
        </>
    );
}