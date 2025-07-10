import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useEffect } from "react";
import Image from "next/image";
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
import { Upload, Link, Plus, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

// interface CloneData {
//   clone_id: string;
//   clone_name: string;
//   catchphrases: string[];
//   dos: string;
//   donts: string;
//   freeform_description: string;
//   image: string;
//   style: string[];
//   tone: string[];
//   values: string[];
// }

// function CloneProfileView({ cloneData }: { cloneData: CloneData }) {
//   return (
//     <div className="flex-1 p-8">
//       <div className="max-w-4xl">
//         <h1 className="text-3xl font-bold text-[#1c1c1c] mb-8">
//           Clone Profile (View Only)
//         </h1>
//         <div className="space-y-6">
//           <div className="flex gap-6 items-end">
//             <div className="flex-1">
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Clone Name
//               </Label>
//               <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50">
//                 {cloneData.clone_name || <span className="italic text-gray-400">N/A</span>}
//               </div>
//             </div>
//             <div className="flex flex-col items-center">
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Clone Image
//               </Label>
//               <div className="w-24 h-24 bg-gray-200 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
//                 {cloneData.cloneImage ? (
//                   <Image
//                     src={cloneData.cloneImage}
//                     alt="Clone preview"
//                     width={96}
//                     height={96}
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 ) : (
//                   <span className="text-gray-500 text-xs text-center">
//                     No Image
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Tone
//               </Label>
//               <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50 min-h-[40px]">
//                 {cloneData.tone ? cloneData.tone.split(",").map((t: string, i: number) => (
//                   <span key={i} className="inline-block mr-2 bg-gray-200 rounded px-2 py-1 text-xs">{t.trim()}</span>
//                 )) : <span className="italic text-gray-400">N/A</span>}
//               </div>
//             </div>
//             <div>
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Style
//               </Label>
//               <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50 min-h-[40px]">
//                 {cloneData.style ? cloneData.style.split(",").map((s: string, i: number) => (
//                   <span key={i} className="inline-block mr-2 bg-gray-200 rounded px-2 py-1 text-xs">{s.trim()}</span>
//                 )) : <span className="italic text-gray-400">N/A</span>}
//               </div>
//             </div>
//           </div>

//           <div>
//             <Label className="text-[#1c1c1c] font-medium mb-2 block">
//               Catchphrases
//             </Label>
//             <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50">
//               {cloneData.catchphrases || <span className="italic text-gray-400">N/A</span>}
//             </div>
//           </div>

//           <div>
//             <Label className="text-[#1c1c1c] font-medium mb-2 block">
//               Core Values
//             </Label>
//             <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50 min-h-[40px]">
//               {cloneData.values ? cloneData.values.split(",").map((v: string, i: number) => (
//                 <span key={i} className="inline-block mr-2 bg-gray-200 rounded px-2 py-1 text-xs">{v.trim()}</span>
//               )) : <span className="italic text-gray-400">N/A</span>}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">
//             <div>
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Do&apos;s
//               </Label>
//               <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50">
//                 {cloneData.dos || <span className="italic text-gray-400">N/A</span>}
//               </div>
//             </div>
//             <div>
//               <Label className="text-[#1c1c1c] font-medium mb-2 block">
//                 Don&apos;ts
//               </Label>
//               <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50">
//                 {cloneData.donts || <span className="italic text-gray-400">N/A</span>}
//               </div>
//             </div>
//           </div>

//           <div>
//             <Label className="text-[#1c1c1c] font-medium mb-2 block">
//               Freeform Description
//             </Label>
//             <div className="border border-[#d9d9d9] rounded px-3 py-2 text-[#858585] bg-gray-50">
//               {cloneData.description || <span className="italic text-gray-400">N/A</span>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function CloneProfileForm({ userId }: { userId: string }) {
  const [cloneImage, setCloneImage] = useState<File | null>(null);
  const [cloneImagePreview, setCloneImagePreview] = useState<string | null>(null);
  const [selectedTones, setSelectedTones] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  // const [cloneId, setCloneId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [cloneData, setCloneData] = useState<CloneData | null>(null);

  // Form data state
  const [formData, setFormData] = useState({
    cloneName: "",
    catchphrases: "Enter upto 5 signature phrases that the clone should use (optional)",
    dos: "Things the clone should always do while answering",
    donts: "Things the clone should avoid while answering",
    description: "Describe in your own words how the clone should behave, think and guide others"
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [links, setLinks] = useState([{ id: 1, value: "" }]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  // Fetch cloneId and clone details
  useEffect(() => {
    const fetchCloneInfo = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        console.log("Fetching user data for userId:", userId);
        // 1. Fetch user data to get cloneId
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`);
        const userData = await userRes.json();
        console.log("Fetched user data:", userData);
        if (userData.cloneId) {
          // setCloneId(userData.cloneId);
          console.log("Found cloneId:", userData.cloneId);
          // 2. Fetch clone details
          const cloneRes = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${userData.cloneId}`);
          const cloneDetails = await cloneRes.json();
          console.log("Fetched clone details:", cloneDetails);
          // setCloneData(cloneDetails);
          // 3. Prefill form fields
          setFormData({
            cloneName: cloneDetails.cloneName || "",
            catchphrases: cloneDetails.catchphrases || "",
            dos: cloneDetails.dos || "",
            donts: cloneDetails.donts || "",
            description: cloneDetails.description || ""
          });
          setSelectedTones(cloneDetails.tone ? cloneDetails.tone.split(",").map((t: string) => t.trim()) : []);
          setSelectedStyles(cloneDetails.style ? cloneDetails.style.split(",").map((s: string) => s.trim()) : []);
          setSelectedValues(cloneDetails.values ? cloneDetails.values.split(",").map((v: string) => v.trim()) : []);
          setCloneImagePreview(cloneDetails.cloneImage || null);
        } else {
          console.log("No cloneId found for user.");
        }
      } catch (err) {
        // Optionally handle error
        console.error("Error fetching clone info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCloneInfo();
  }, [userId]);

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle checkbox selections
  const handleToneChange = (tone: string, checked: boolean) => {
    if (checked) {
      setSelectedTones(prev => [...prev, tone]);
    } else {
      setSelectedTones(prev => prev.filter(t => t !== tone));
    }
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setSelectedStyles(prev => [...prev, style]);
    } else {
      setSelectedStyles(prev => prev.filter(s => s !== style));
    }
  };

  const handleValuesChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedValues(prev => [...prev, value]);
    } else {
      setSelectedValues(prev => prev.filter(v => v !== value));
    }
  };

  // Reset form data
  // const resetForm = () => {
  //   setFormData({
  //     cloneName: "",
  //     catchphrases: "Enter upto 5 signature phrases that the clone should use (optional)",
  //     dos: "Things the clone should always do while answering",
  //     donts: "Things the clone should avoid while answering",
  //     description: "Describe in your own words how the clone should behave, think and guide others"
  //   });
  //   setCloneImage(null);
  //   setSelectedTone("Set your tone");
  //   setSelectedStyle("Set your style");
  //   setSelectedValues("Set your values");
  //   setUploadedFiles([]);
  //   setLinks([{ id: 1, value: "" }]);
  // };

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

  const addLink = () => {
    setLinks([...links, { id: links.length + 1, value: "" }]);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const updateLink = (id: number, value: string) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, value } : link)));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const submitFormData = new FormData();
      const { cloneName, catchphrases, dos, donts, description } = formData;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const validLinks = links.filter((link) => link.value.trim() !== "");
      
      const hasRequiredData = cloneName && 
        selectedTones.length > 0 && 
        selectedStyles.length > 0 && 
        selectedValues.length > 0 &&
        token &&
        userId;
      
      if (!hasRequiredData) {
        alert("Please fill in all required fields (Clone Name, Tone, Style, Values)");
        return;
      }
      
      // Add form fields to FormData
      submitFormData.append('cloneName', cloneName);
      submitFormData.append('tone', selectedTones.join(', '));
      submitFormData.append('style', selectedStyles.join(', '));
      submitFormData.append('values', selectedValues.join(', '));
      submitFormData.append('catchphrases', catchphrases);
      submitFormData.append('dos', dos);
      submitFormData.append('donts', donts);
      submitFormData.append('description', description);
      
      // Add userId to FormData
      submitFormData.append('userId', userId);
      
      // Add clone image if exists
      if (cloneImage) {
        submitFormData.append('cloneImage', cloneImage);
        console.log('Image file added:', cloneImage);
      }
      
      // Add uploaded files
      uploadedFiles.forEach((file) => {
        submitFormData.append('files', file.file);
      });
      
      // Add links as JSON string
      submitFormData.append('links', JSON.stringify(validLinks));

      if (!token) {
        alert("Authentication token not found. Please log in again.");
        return;
      }
      
      const url = `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/create`;
      
      // Debug logging to see what's being sent
      console.log('Selected Tones:', selectedTones);
      console.log('Selected Styles:', selectedStyles);
      console.log('Selected Values:', selectedValues);
      console.log('Form Data:', formData);
      
      // Log FormData contents
      // for (let [key, value] of submitFormData.entries()) {
      //   console.log(`${key}:`, value);
      // }
      
      if (!process.env.NEXT_PUBLIC_DATA_BACKEND_URL) {
        alert("Backend URL not configured. Please check your environment variables.");
        return;
      }
      
      const response = await fetch(url, {
        method: "POST",
        body: submitFormData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      // Reset form state
      // resetForm();
      
      alert("Clone profile created successfully!");
      
    } catch (error) {
      console.error("Error creating clone profile:", error);
      alert("Failed to create clone profile. Please try again.");
    }
  };

  const toneOptions = [
    "friendly",
    "professional",
    "visionary",
    "humble",
    "motivational",
    "empathetic",
    "witty",
    "direct",
    "calm",
    "authoritative",
  ];

  const styleOptions = [
    "storytelling",
    "technical explanation",
    "direct and conscise",
    "conversational",
    "philosophical",
    "analytical",
    "casual",
    "educational",
    "measured",
    "metaphorical",
  ];

  const valuesOptions = [
    "discipline",
    "innovation",
    "empathy",
    "rationality",
    "peace",
    "unity",
    "simplicity",
    "growth mindset",
    "integrity",
    "entrepreneurship",
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCloneImage(file);
      
      // Create preview URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        setCloneImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) return <div>Loading...</div>;

  // If cloneId and cloneData are present, show view UI
  // if (cloneId && cloneData) {
  //   return <CloneProfileView cloneData={cloneData} />;
  // }

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1c1c1c] mb-8">
          Clone Profile
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex gap-6 items-end">
            <div className="flex-1">
              <Label
                htmlFor="cloneName"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Clone Name
              </Label>
              <Input
                id="cloneName"
                value={formData.cloneName}
                onChange={(e) => handleInputChange('cloneName', e.target.value)}
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>
            <div className="flex flex-col items-center">
              <Label className="text-[#1c1c1c] font-medium mb-2 block">
                Clone Image
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                onClick={handleImageClick}
                className="w-24 h-24 bg-gray-200 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors overflow-hidden"
              >
                {cloneImagePreview ? (
                  <Image
                    src={cloneImagePreview}
                    alt="Clone preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500 text-xs text-center">
                    Upload Image
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="tone"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Tone
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-[#d9d9d9] rounded-md p-3">
                {toneOptions.map((tone) => (
                  <div key={tone} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tone-${tone}`}
                      checked={selectedTones.includes(tone)}
                      onCheckedChange={(checked) => handleToneChange(tone, checked as boolean)}
                    />
                    <Label
                      htmlFor={`tone-${tone}`}
                      className="text-sm text-[#858585] cursor-pointer"
                    >
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label
                htmlFor="style"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Style
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-[#d9d9d9] rounded-md p-3">
                {styleOptions.map((style) => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox
                      id={`style-${style}`}
                      checked={selectedStyles.includes(style)}
                      onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                    />
                    <Label
                      htmlFor={`style-${style}`}
                      className="text-sm text-[#858585] cursor-pointer"
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label
              htmlFor="catchphrases"
              className="text-[#1c1c1c] font-medium mb-2 block"
            >
              Catchphrases
            </Label>
            <Input
              id="catchphrases"
              value={formData.catchphrases}
              onChange={(e) => handleInputChange('catchphrases', e.target.value)}
              className="border-[#d9d9d9] text-[#858585]"
            />
          </div>

          <div>
            <Label
              htmlFor="values"
              className="text-[#1c1c1c] font-medium mb-2 block"
            >
              Core Values
            </Label>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border border-[#d9d9d9] rounded-md p-3">
              {valuesOptions.map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`value-${value}`}
                    checked={selectedValues.includes(value)}
                    onCheckedChange={(checked) => handleValuesChange(value, checked as boolean)}
                  />
                  <Label
                    htmlFor={`value-${value}`}
                    className="text-sm text-[#858585] cursor-pointer"
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="dos"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Do&apos;s
              </Label>
              <Input
                id="dos"
                value={formData.dos}
                onChange={(e) => handleInputChange('dos', e.target.value)}
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>
            <div>
              <Label
                htmlFor="donts"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Don&apos;ts
              </Label>
              <Input
                id="donts"
                value={formData.donts}
                onChange={(e) => handleInputChange('donts', e.target.value)}
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-[#1c1c1c] font-medium mb-2 block"
            >
              Freeform Description
            </Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="border-[#d9d9d9] text-[#858585]"
            />
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="container max-w-6xl mx-auto px-4 ">
              <div className="text-center mb-6">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose how you want to share your content. Upload files
                  directly or share via links.
                </p>
              </div>

              <div className="flex items-center justify-center gap-8">
                {/* File Upload Box */}
                <div
                  onClick={() => setIsDialogOpen(true)}
                  className="group h-[20rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 rounded-xl cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Upload Files
                      </h3>
                      <p className="text-sm text-gray-500">
                        Share files directly from your device
                      </p>
                    </div>
                  </div>
                </div>

                {/* OR Text */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-gray-50 px-4 text-sm text-gray-500">
                      or
                    </span>
                  </div>
                </div>

                {/* Link Box */}
                <div
                  onClick={() => setIsShareDialogOpen(true)}
                  className="group h-[20rem] w-[25rem] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 rounded-xl cursor-pointer hover:border-green-500 hover:text-green-500 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-green-50 rounded-full group-hover:bg-green-100 transition-colors">
                      <Link className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Share Links
                      </h3>
                      <p className="text-sm text-gray-500">
                        Share content via URLs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[500px] p-6">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Upload Files
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Upload your user-downloadable files.
                  </DialogDescription>
                </DialogHeader>

                {/* Dropzone Area */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-gray-300 rounded-md py-10 text-center text-sm text-gray-500 cursor-pointer transition-colors ${
                    isDragActive ? "border-blue-500 bg-blue-50" : ""
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
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-gray-50 p-2 px-3 rounded-md border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded">
                          {file.type}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
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
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    disabled={uploadedFiles.length === 0}
                  >
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogContent className="sm:max-w-[450px] p-6 text-center">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    Add Links
                  </DialogTitle>
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
                  onClick={() => setIsShareDialogOpen(false)}
                >
                  Done
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="px-8 py-2 border-[#ff7008] text-[#ff7008] hover:bg-[#ff7008] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-8 py-2 bg-[#ff7008] hover:bg-[#ff7008]/90 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
