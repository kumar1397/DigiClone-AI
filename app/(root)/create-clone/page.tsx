"use client";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Brain,
  Upload,
  Link as LinkIcon,
  X,
  Plus,
  ArrowLeft,
  Trash2,
  Play,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const CreateClone = () => {
  const [cloneName, setCloneName] = useState("");
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [catchphrases, setCatchphrases] = useState("");
  const [dos, setDos] = useState("");
  const [donts, setDonts] = useState("");
  const [freeformDescription, setFreeformDescription] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [linksDialogOpen, setLinksDialogOpen] = useState(false);
  const [youtubeLinksDialogOpen, setYoutubeLinksDialogOpen] = useState(false);
  const [links, setLinks] = useState<string[]>([""]);
  const [youtubeLinks, setYoutubeLinks] = useState<string[]>([""]);
  const [cloneImage, setCloneImage] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const toneOptions = [
    "Friendly",
    "Professional",
    "Visionary",
    "Humble",
    "Motivational",
    "Empathetic",
    "Witty",
    "Authoritative",
    "Caring",
    "Inspiring",
  ];

  const styleOptions = [
    "Storytelling",
    "Technical explanation",
    "Direct and concise",
    "Conversational",
    "Philosophical",
    "Analytical",
    "Casual",
    "Educational",
  ];

  const valueOptions = [
    "Discipline",
    "Innovation",
    "Empathy",
    "Rationality",
    "Peace",
    "Unity",
    "Simplicity",
    "Growth",
    "Authenticity",
    "Excellence",
  ];

  const handleToneChange = (tone: string, checked: boolean) => {
    if (checked) {
      setSelectedTones([...selectedTones, tone]);
    } else {
      setSelectedTones(selectedTones.filter((t) => t !== tone));
    }
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles([...selectedStyles, style]);
    } else {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    }
  };

  const handleValueChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    }
  };

  const handleAddLink = () => {
    setLinks([...links, ""]);
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCloneImage(file);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Add text fields
    formData.append('userId', localStorage.getItem("userId") || '');
    formData.append('cloneName', cloneName);
    formData.append('tone', JSON.stringify(selectedTones));
    formData.append('style', JSON.stringify(selectedStyles));
    formData.append('values', JSON.stringify(selectedValues));
    formData.append('catchphrases', catchphrases);
    formData.append('dos', dos);
    formData.append('donts', donts);
    formData.append('description', freeformDescription);
    formData.append('youtubeLinks', JSON.stringify(youtubeLinks.filter((link) => link.trim() !== "")));
    formData.append('otherLinks', JSON.stringify(links.filter((link) => link.trim() !== "")));

    // Add clone image if exists
    if (cloneImage) {
      formData.append('cloneImage', cloneImage);
    }

    // Add uploaded files
    uploadedFiles.forEach((file) => {
      formData.append(`uploadedFiles`, file.file);
    });

    const url = `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/create`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

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

    console.log("Form Data:", formData);
    console.log("Raw Form Data:", {
      cloneName,
      selectedTones,
      selectedStyles,
      selectedValues,
      catchphrases,
      dos,
      donts,
      freeformDescription,
      links,
      youtubeLinks,
      cloneImage,
      uploadedFiles,
    });

    toast.success("Clone created successfully!");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-full">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-serif font-bold">Clone Profile</h1>
          </div>
          <p className="text-muted-foreground">
            Configure your digital clone&apos;s personality and behavior
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Clone Name and Image */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <Label
                      htmlFor="cloneName"
                      className="text-base font-semibold"
                    >
                      Clone Name
                    </Label>
                    <Input
                      id="cloneName"
                      value={cloneName}
                      onChange={(e) => setCloneName(e.target.value)}
                      placeholder="Enter your clone's name"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <Label className="text-base font-semibold mb-2">
                    Clone Image
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="clone-image-upload"
                    />
                    <label
                      htmlFor="clone-image-upload"
                      className="w-32 h-32 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors"
                    >
                      {cloneImage ? (
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={URL.createObjectURL(cloneImage)}
                            alt="Clone preview"
                            className="w-full h-full object-cover"
                            width={128}
                            height={128}
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Upload Image
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tone and Style */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Personality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Tone
                  </Label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                    {toneOptions.map((tone) => (
                      <div key={tone} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tone-${tone}`}
                          checked={selectedTones.includes(tone)}
                          onCheckedChange={(checked) =>
                            handleToneChange(tone, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`tone-${tone}`}
                          className="text-sm cursor-pointer"
                        >
                          {tone}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Style
                  </Label>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                    {styleOptions.map((style) => (
                      <div key={style} className="flex items-center space-x-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={selectedStyles.includes(style)}
                          onCheckedChange={(checked) =>
                            handleStyleChange(style, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={`style-${style}`}
                          className="text-sm cursor-pointer"
                        >
                          {style}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Catchphrases */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Catchphrases</CardTitle>
              <CardDescription>
                Enter up to 5 signature phrases that the clone should use
                (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={catchphrases}
                onChange={(e) => setCatchphrases(e.target.value)}
                placeholder="Enter signature phrases, separated by commas or new lines"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                {valueOptions.map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`value-${value}`}
                      checked={selectedValues.includes(value)}
                      onCheckedChange={(checked) =>
                        handleValueChange(value, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`value-${value}`}
                      className="text-sm cursor-pointer"
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="dos" className="text-base font-semibold">
                    Do&apos;s
                  </Label>
                  <Textarea
                    id="dos"
                    value={dos}
                    onChange={(e) => setDos(e.target.value)}
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
                    value={donts}
                    onChange={(e) => setDonts(e.target.value)}
                    placeholder="Things the clone should avoid while answering"
                    className="mt-2 min-h-[120px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Freeform Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-serif">
                Freeform Description
              </CardTitle>
              <CardDescription>
                Describe in your own words how the clone should behave, think
                and guide others
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={freeformDescription}
                onChange={(e) => setFreeformDescription(e.target.value)}
                placeholder="Describe your clone's personality, approach, and unique characteristics in detail..."
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>

          {/* Content Upload Section */}
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
                      className={`border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragActive ? "border-primary bg-primary/10" : ""
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
                      <Button onClick={() => setUploadDialogOpen(false)}>
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
                      onClick={() => setYoutubeLinksDialogOpen(false)}
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
                      onClick={() => setLinksDialogOpen(false)}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Done
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-12 py-3"
            >
              Create Your Clone
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClone;
