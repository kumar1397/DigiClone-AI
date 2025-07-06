import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import Image from "next/image";
import { useState, useEffect, useRef } from "react";
interface User {
  name:string;
  email:string;
  phone:number;
  profilePicture:string;
}
export default function Profile( { userId }: { userId: string | null } ) {
  console.log("User ID from Profile component:", userId);
  console.log("User ID type:", typeof userId);
  console.log("User ID is truthy:", !!userId);
  const [userData, setUserData] = useState<User | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("useEffect triggered with userId:", userId);
    if (userId) {
      console.log("userId is truthy, calling fetchUserData");
      const fetchUserData = async () => {
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            credentials: "include",
          });
          if (!response.ok){
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data);
          setPhone(data.phone ? String(data.phone) : "");
          setImagePreview(data.profilePicture || "/placeholder.svg");
          console.log("Fetched user data:", data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    } else {
      console.log("userId is falsy, not calling fetchUserData");
    }
  }, [userId]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const formData = new FormData();
    formData.append("phone", phone);
    if (selectedImage) {
      formData.append("profilePicture", selectedImage);
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update user data");
      const updated = await response.json();
      setUserData(updated);
      setSelectedImage(null);
      // Optionally show a success message
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl">
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1c1c1c]">Edit profile</h1>
          <div className="w-20 h-20 rounded-full overflow-hidden cursor-pointer" onClick={handleImageClick}>
            <Image
              src={imagePreview || "/placeholder.svg"}
              alt="Profile picture"
              className="w-full h-full object-cover"
              width={80}
              height={80}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="firstName"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue={userData?.name}
                className="border-[#d9d9d9] text-[#858585]"
                readOnly
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue={userData?.name}
                className="border-[#d9d9d9] text-[#858585]"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="email"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  defaultValue={userData?.email}
                  className="border-[#d9d9d9] text-[#858585] pr-10"
                  readOnly
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-[#23b000] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label
                htmlFor="contact"
                className="text-[#1c1c1c] font-medium mb-2 block"
              >
                Contact Number
              </Label>
              <Input
                id="contact"
                value={phone}
                onChange={handlePhoneChange}
                className="border-[#d9d9d9] text-[#858585]"
              />
            </div>

          </div>


          <div className="grid grid-cols-2 gap-6">
            
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
