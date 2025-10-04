
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, User } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
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
  linkedin?: string;
  github?: string;
  website1?: string;
  website2?: string;
}

const ProfileSection = ({ userId }: ProfileSectionProps) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFieldChange = (field: keyof User) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUser(prev => prev ? { ...prev, [field]: value } : prev);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !user) return;

    const formData = new FormData();
    formData.append("phone", user.phone || "");
    formData.append("linkedin", user.linkedin || "");
    formData.append("github", user.github || "");
    formData.append("website1", user.website1 || "");
    formData.append("website2", user.website2 || "");

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed: ${response.status} - ${errorData.message || "Unknown error"}`);
      }

      const updated = await response.json();
      setUser(updated);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Error updating user data:", err);
    }
  };



  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        const data = await res.json();
        setUser(data);
      } catch {
        console.error("Failed to fetch user data");
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
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="don't use any country code"
                value={user.phone ?? ""}
                onChange={handleFieldChange("phone")}
              />
            </div>
          </div>
          
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* LinkedIn */}
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={user.linkedin ?? ""}
              onChange={handleFieldChange("linkedin")}
            />
          </div>

          {/* GitHub */}
          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              type="url"
              placeholder="https://github.com/username"
              value={user.github ?? ""}
              onChange={handleFieldChange("github")}
            />
          </div>

          {/* Website 1 */}
          <div className="space-y-2">
            <Label>Website 1</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={user.website1 ?? ""}
              onChange={handleFieldChange("website1")}
            />
          </div>

          {/* Website 2 */}
          <div className="space-y-2">
            <Label>Website 2</Label>
            <Input
              type="url"
              placeholder="https://portfolio.com"
              value={user.website2 ?? ""}
              onChange={handleFieldChange("website2")}
            />
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