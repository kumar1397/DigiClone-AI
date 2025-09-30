
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, User } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/lib/useUserStore";
import { useEffect } from "react";

interface ProfileSectionProps {
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profilePicture: string;
}

const ProfileSection = ({ userId }: ProfileSectionProps) => {
  const { name, email, image } = useUserStore();
  const [user, setUser] = useState<User | null>(null);
  const [phone, setPhone] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const formData = new FormData();
    formData.append("phone", phone);



    // Debug: Log what we're sending
    try {
      const response = await fetch(`api/users/${userId}`, {
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
      setPhone(updated.phone || "");
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating user data:", err);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err.message);
      } 
    }
    fetchUser();
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
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback className="text-lg">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={user?.name}
            />
          </div>
        </div>

        {/* Second row: Email and Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={user?.email}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="don't use any country code"
                value={user?.phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
        </div>

        {/* Button below */}
        <Button onClick={handleSubmit} className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground">
          <User className="h-4 w-4 mr-2" />
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;