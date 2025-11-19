"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, User, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/lib/useUserStore";
interface ProfileSectionProps {
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  profilePicture?: string;
  company?: string;
  jobrole?: string;
  linkedin?: string;
  github?: string;
  website1?: string;
}

const ProfileSection = ({ userId }: ProfileSectionProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setUser = useUserStore((s) => s.setUser);
  // Handle profile field changes
  const handleFieldChange = useCallback(
    (field: keyof User) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserData((prev) => (prev ? { ...prev, [field]: value } : prev));
      },
    []
  );

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "profile-pictures");
      formData.append("type", "image");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errMsg = `Upload failed: ${res.status}`;
        try {
          const json = await res.json();
          errMsg = json.message || errMsg;
        } catch { }
        toast.error(errMsg);
        return;
      }

      const data = await res.json();
      const url = data.url;
      if (url) {
        setUserData((prev) => (prev ? { ...prev, profilePicture: url } : prev));
      }
    } catch (err) {
      console.error("Error uploading profile image:", err);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Submit profile updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !userData) return;

    setSubmitting(true);
    const formData = new FormData();
    formData.append("phone", userData.phone || "");
    formData.append("linkedin", userData.linkedin || "");
    formData.append("github", userData.github || "");
    formData.append("profilePicture", userData.profilePicture || "");
    formData.append("company", userData.company || "");
    formData.append("jobrole", userData.jobrole || "");
    formData.append("website1", userData.website1 || "");

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed: ${response.status} - ${errorData.message || "Unknown error"}`
        );
      }

      const updated = await response.json();
      setUserData(updated);
      setUser({ image: userData.profilePicture });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error(`Failed to fetch user: ${res.status}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.error("Unable to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // --- Loading screen ---
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        <Loader2 className="animate-spin h-6 w-6 mr-2 text-gray-500" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  // --- Fallback if no user data ---
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-600">
        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
        <p>Failed to load profile data. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Personal Information</CardTitle>
        <CardDescription>
          Manage your profile details and preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-6">
          <div className="relative" onClick={handleImageClick}>
            <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition">
              <AvatarImage src={userData.profilePicture} loading="lazy" />
              <AvatarFallback className="text-lg">
                {userData.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={userData.name} readOnly />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input type="email" value={userData.email} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="don't use any country code"
                value={userData.phone ?? ""}
                onChange={handleFieldChange("phone")}
              />
            </div>
          </div>
        </div>

        {/* Social + Company Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={userData.linkedin ?? ""}
              onChange={handleFieldChange("linkedin")}
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input
              type="url"
              placeholder="https://github.com/username"
              value={userData.github ?? ""}
              onChange={handleFieldChange("github")}
            />
          </div>

          <div className="space-y-2">
            <Label>Company you work at</Label>
            <Input
              placeholder="Company Name"
              value={userData.company ?? ""}
              onChange={handleFieldChange("company")}
            />
          </div>

          <div className="space-y-2">
            <Label>Your position</Label>
            <Input
              placeholder="Role name"
              value={userData.jobrole ?? ""}
              onChange={handleFieldChange("jobrole")}
            />
          </div>

          <div className="space-y-2">
            <Label>Website</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={userData.website1 ?? ""}
              onChange={handleFieldChange("website1")}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          disabled={submitting || uploading}
          onClick={handleSubmit}
          className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <User className="h-4 w-4 mr-2" />
              Update Profile
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
