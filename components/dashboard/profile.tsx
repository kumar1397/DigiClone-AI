
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, User } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";

interface userProfile {
  name: string;
  email: string;
  profilePicture: string;
  phone: string;
};

interface ProfileSectionProps {
  userId: string;
}

const ProfileSection = ({ userId }: ProfileSectionProps) => {
  const [userProfile, setUserData] = useState<userProfile>({
    name: "",
    email: "",
    profilePicture: "",
    phone: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userProfile, phone: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const formData = new FormData();
    formData.append("phone", userProfile.phone);
    if (selectedImage) {
      formData.append("profilePicture", selectedImage);
    }

    // Debug: Log what we're sending
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Update failed:", response.status, errorData);
        throw new Error(`Failed to update user data: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }
      const updated = await response.json();
      setUserData(prevUserData => {
        if (!prevUserData) return updated;
        return {
          ...prevUserData,
          ...updated
        };
      });

      setSelectedImage(null);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating user data:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            credentials: "include",
          });
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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Personal Information</CardTitle>
        <CardDescription>
          Manage your profile details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* First row: Image and Name */}
        <div className="flex items-center gap-6">
          <div className="relative" onClick={handleImageClick}>
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.profilePicture} />
              <AvatarFallback className="text-lg">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={userProfile.name}
            />
          </div>
        </div>

        {/* Second row: Email and Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={userProfile.email}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="don't use any country code"
                value={userProfile.phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
        </div>

        {/* Button below */}
        <Button onClick={handleSubmit} className="bg-primary hover:bg-secondary text-primary-foreground">
          <User className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;