import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function CloneProfileForm() {
  const [cloneImage, setCloneImage] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState("calm and dignified");
  const [selectedStyle, setSelectedStyle] = useState("measured and thoughtful");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    "authoritative"
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCloneImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#1c1c1c] mb-8">Edit Clone Profile</h1>
        <form className="space-y-6">
          <div className="flex gap-6 items-end">
            <div className="flex-1">
              <Label htmlFor="cloneName" className="text-[#1c1c1c] font-medium mb-2 block">
                Clone Name
              </Label>
              <Input id="cloneName" defaultValue="Ratan Tata" className="border-[#d9d9d9] text-[#858585]" />
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
                {cloneImage ? (
                  <Image
                    src={cloneImage}
                    alt="Clone preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500 text-xs text-center">Upload Image</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="tone" className="text-[#1c1c1c] font-medium mb-2 block">
                Tone
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between border-[#d9d9d9] text-[#858585]">
                    {selectedTone}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {toneOptions.map((tone) => (
                    <DropdownMenuItem key={tone} onClick={() => setSelectedTone(tone)}>
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Label htmlFor="style" className="text-[#1c1c1c] font-medium mb-2 block">
                Style
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-between border-[#d9d9d9] text-[#858585]">
                    {selectedStyle}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  {styleOptions.map((style) => (
                    <DropdownMenuItem key={style} onClick={() => setSelectedStyle(style)}>
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <Label htmlFor="catchphrases" className="text-[#1c1c1c] font-medium mb-2 block">
              Catchphrases
            </Label>
            <Input
              id="catchphrases"
              defaultValue="I don't believe in taking right decisions..., Ups and downs in life..."
              className="border-[#d9d9d9] text-[#858585]"
            />
          </div>

          <div>
            <Label htmlFor="values" className="text-[#1c1c1c] font-medium mb-2 block">
              Core Values
            </Label>
            <Input id="values" defaultValue="integrity, humility, nation-building" className="border-[#d9d9d9] text-[#858585]" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="dos" className="text-[#1c1c1c] font-medium mb-2 block">
                Do&apos;s
              </Label>
              <Input id="dos" defaultValue="Promote ethical leadership and empathy, emphasize long-term vision" className="border-[#d9d9d9] text-[#858585]" />
            </div>
            <div>
              <Label htmlFor="donts" className="text-[#1c1c1c] font-medium mb-2 block">
                Don&apos;ts
              </Label>
              <Input id="donts" defaultValue="Avoid self-promotion or flamboyance" className="border-[#d9d9d9] text-[#858585]" />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-[#1c1c1c] font-medium mb-2 block">
              Freeform Description
            </Label>
            <Input
              id="description"
              defaultValue="A wise and soft-spoken mentor who speaks about leadership with grace..."
              className="border-[#d9d9d9] text-[#858585]"
            />
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" className="px-8 py-2 border-[#ff7008] text-[#ff7008] hover:bg-[#ff7008] hover:text-white">
              Cancel
            </Button>
            <Button type="submit" className="px-8 py-2 bg-[#ff7008] hover:bg-[#ff7008]/90 text-white">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
