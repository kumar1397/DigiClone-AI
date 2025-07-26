import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Upload,
  Link as LinkIcon,
  X,
  Plus,
  Trash2,
  Play,
  FileText
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/navbar";
import QuickStatsGrid from "./quickstatsgrid";
import ProfileSection from "./profile"
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

interface CloneCreatorDashboardProps {
  userId: string;
  cloneId: string;
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
}

interface userProfile {
  name: string;
  profilePicture: string;
};
interface UploadedFile {
  id: string;
  fileId: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export default function CloneCreatorDashboard({
  userId,
  cloneId,
}: CloneCreatorDashboardProps) {

  const [userProfile, setUserData] = useState<userProfile>({
    name: "",
    profilePicture: "",
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [linksDialogOpen, setLinksDialogOpen] = useState(false);
  const [youtubeLinksDialogOpen, setYoutubeLinksDialogOpen] = useState(false);
  const [links, setLinks] = useState<string[]>([""]);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([""]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadSources, setUploadSources] = useState<UploadedFile[]>([]);
  const [saving, setSaving] = useState(false);
  const [newCatchphraseInput, setNewCatchphraseInput] = useState("");

  const [cloneData, setCloneData] = useState<CloneData>({
    clone_id: "",
    clone_name: "",
    catchphrases: [],
    dos: "",
    donts: "",
    freeform_description: "",
    image: "",
    style: [],
    tone: [],
    values: [],
  });

  useEffect(() => {
    const fetchCloneInfo = async () => {
      try {
        if (cloneId) {
          const cloneRes = await fetch(
            `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${cloneId}`
          );
          if (!cloneRes.ok) {
            throw new Error("Failed to fetch clone data");
          }
          const cloneData = await cloneRes.json();
          const data = cloneData.data; // ✅ get actual clone data from "data" field

          const parsedClone = {
            clone_id: data.cloneIdStr || "",
            clone_name: data.cloneName || "",
            catchphrases: data.catchphrases || [],
            dos: data.dos || "",
            donts: data.donts || "",
            freeform_description: data.description || "",
            image: data.image || "",
            style: data.style,
            tone: (data.tone),
            values: (data.values),
          };
          setCloneData(parsedClone);
        } else {
          console.error("No cloneId found for user.");
        }
      } catch (err) {
        console.error("Error fetching clone info:", err);
      }
    };

    fetchCloneInfo();
  }, [cloneId]);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  const handleAddLink = () => {
    setLinks([...links, ""]);
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => {
      const uniqueId = Math.random().toString(36).substr(2, 9);

      return {
        id: uniqueId,           // Used for React rendering or temporary tracking
        fileId: uniqueId,       // Can be replaced later with backend GridFS ID
        name: file.name,
        size: file.size,
        type: file.type.split("/")[1].toUpperCase(),
        file: file,
      };
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

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleAddYoutubeLink = () => {
    setYoutubeLinks([...youtubeLinks, ""]);
  };

  const handleYoutubeLinkChange = (index: number, value: string) => {
    const newYoutubeLinks = [...youtubeLinks];
    newYoutubeLinks[index] = value;
    setYoutubeLinks(newYoutubeLinks);
  };

  const handleRemoveYoutubeLink = (index: number) => {
    setYoutubeLinks(youtubeLinks.filter((_, i) => i !== index));
  }

  const handleFileUpload = async () => {
    setUploadDialogOpen(false);
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append("uploadedFiles", file.file);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/upload/pdf/${cloneId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          alert("Unauthorized. Please log in again.");
        } else if (response.status === 400) {
          alert(`Bad Request: ${errorText}`);
        } else {
          throw new Error(`Submission failed: ${response.status} - ${errorText}`);
        }
        return;
      }

      toast.success("Files uploaded successfully!");
      setUploadedFiles([]); // Clear local uploads
      await fetchFiles(); // 🔁 Refresh file list from backend
    } catch (error) {
      toast.error("Failed to upload files");
    }
  };

  const handleYoutubeLinkUpload = async () => {
    setYoutubeLinksDialogOpen(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/upload/youtube/${cloneId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeLinks }),
      });
      if (!response.ok) {
        throw new Error("Failed to upload YouTube links");
      }
      toast.success("YouTube links uploaded successfully!");
      setYoutubeLinks([]);
    } catch (error) {
      toast.error("Failed to upload YouTube links");
    }
  }

  const handleOtherLinkUplaod = async () => {
    setLinksDialogOpen(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/upload/other/${cloneId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otherLinks: links }),
      });
      if (!response.ok) {
        throw new Error("Failed to upload links");
      }
      toast.success("Links uploaded successfully!");
      setLinks([]);
    } catch (error) {
      toast.error("Failed to upload links");
    }
  }

  const fetchFiles = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/files/${cloneId}`);
      const data = await response.json();
      if (response.ok) {
        setUploadSources(data.files);
      } else {
        console.error("Failed to fetch files:", data.message);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }, [cloneId]);

  // Load files on initial mount
  useEffect(() => {
    if (cloneId) fetchFiles();
  }, [cloneId, fetchFiles]);

  useEffect(() => {
  }, [uploadSources, cloneId, userId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={userProfile.profilePicture} />
                <AvatarFallback>
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-serif font-bold">
                  Welcome, {userProfile.name}!
                </h1>
                <p className="text-muted-foreground">
                  Explore AI clones and manage your profile
                </p>
              </div>
            </div>
          </div>

          <QuickStatsGrid userType="clone-creator" />
        </div>

        <Tabs defaultValue="knowledge" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Personal Details</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="personality">Clone Personality</TabsTrigger>
            {/* <TabsTrigger value="training">Training Status</TabsTrigger>
            <TabsTrigger value="preview">Preview & Test</TabsTrigger> */}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSection userId={userId} />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
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
                <div className="grid md:grid-cols-3 gap-6">
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

                  <Dialog
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
                  </Dialog>
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
                        <p className="font-medium truncate">{source.name}</p>
                      </div>

                      <a
                        href={`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/file/${source.fileId}`}
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


          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!cloneData.clone_id) {
                  toast.error("Missing clone ID.");
                  return;
                }
                setSaving(true);
                try {
                  const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${cloneData.clone_id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tone: cloneData.tone,
                      style: cloneData.style,
                      catchphrases: cloneData.catchphrases,
                      dos: cloneData.dos,
                      donts: cloneData.donts,
                      freeform_description: cloneData.freeform_description,
                    }),
                  });
                  if (!res.ok) throw new Error("Failed to update clone data");
                  toast.success("Personality updated!");
                } catch (err) {
                  console.error(err);
                  toast.error("Failed to update personality");
                } finally {
                  setSaving(false);
                }
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Clone Personality</CardTitle>
                  <CardDescription>
                    Define your clone&apos;s tone, style, catchphrases, do&apos;s & don&apos;ts, and a freeform description.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Tone</Label>
                      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                        {["Friendly", "Professional", "Visionary", "Humble", "Motivational", "Empathetic", "Witty", "Authoritative", "Caring", "Inspiring"].map((tone) => {
                          const id = `tone-${tone.replace(/\s+/g, "-").toLowerCase()}`;
                          return (
                            <div key={tone} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={id}
                                checked={cloneData.tone.includes(tone)}
                                onChange={(e) =>
                                  setCloneData((prev) => ({
                                    ...prev,
                                    tone: e.target.checked
                                      ? [...prev.tone, tone]
                                      : prev.tone.filter((t) => t !== tone),
                                  }))
                                }
                              />
                              <Label htmlFor={id} className="text-sm cursor-pointer">
                                {tone}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Style</Label>
                      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                        {["Storytelling", "Technical explanation", "Direct and concise", "Conversational", "Philosophical", "Analytical", "Casual", "Educational"].map((style) => {
                          const id = `style-${style.replace(/\s+/g, "-").toLowerCase()}`;
                          return (
                            <div key={style} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={id}
                                checked={cloneData.style.includes(style)}
                                onChange={(e) =>
                                  setCloneData((prev) => ({
                                    ...prev,
                                    style: e.target.checked
                                      ? [...prev.style, style]
                                      : prev.style.filter((s) => s !== style),
                                  }))
                                }
                              />
                              <Label htmlFor={id} className="text-sm cursor-pointer">
                                {style}
                              </Label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold block">Catchphrases</Label>

                    {/* Display catchphrases */}
                    <div className="flex flex-wrap gap-2">
                      {cloneData.catchphrases.length === 0 && (
                        <p className="text-sm text-muted-foreground">No catchphrases yet.</p>
                      )}
                      {cloneData.catchphrases.map((phrase, idx) => (
                        <div
                          key={idx}
                          className="bg-muted rounded-full px-3 py-1 text-sm border border-gray-300"
                        >
                          {phrase}
                        </div>
                      ))}
                    </div>

                    {/* Input to add more catchphrases */}
                    <Input
                      type="text"
                      value={newCatchphraseInput}
                      onChange={(e) => setNewCatchphraseInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const newItems = newCatchphraseInput
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .filter((s) => !cloneData.catchphrases.includes(s));
                          if (newItems.length > 0) {
                            setCloneData((prev) => ({
                              ...prev,
                              catchphrases: [...prev.catchphrases, ...newItems],
                            }));
                            setNewCatchphraseInput("");
                          }
                        }
                      }}
                      placeholder="Add catchphrases (comma separated) and press Enter"
                    />
                  </div>


                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="dos" className="text-base font-semibold">
                        Do&apos;s
                      </Label>
                      <Textarea
                        id="dos"
                        value={cloneData.dos}
                        onChange={(e) => setCloneData((prev) => ({ ...prev, dos: e.target.value }))}
                        placeholder="Things the clone should always do while answering"
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="donts" className="text-base font-semibold">
                        Don&apos;ts
                      </Label>
                      <Textarea
                        id="donts"
                        value={cloneData.donts}
                        onChange={(e) => setCloneData((prev) => ({ ...prev, donts: e.target.value }))}
                        placeholder="Things the clone should avoid while answering"
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold mb-2 block">Freeform Description</Label>
                    <Textarea
                      value={cloneData.freeform_description}
                      onChange={(e) =>
                        setCloneData((prev) => ({
                          ...prev,
                          freeform_description: e.target.value,
                        }))
                      }
                      placeholder="Describe your clone's personality, approach, and unique characteristics in detail..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-secondary text-primary-foreground"
                  >
                    {saving ? "Saving..." : "Save Personality"}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};


