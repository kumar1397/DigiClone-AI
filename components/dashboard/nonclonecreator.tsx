"use client"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Navbar from "@/components/navbar";
import QuickStatsGrid from "./quickstatsgrid";
import ProfileSection from "./profile";
import CloneConversationsSection from "./cloneconversation";
import {useRouter} from 'next/navigation';
import { useEffect, useState } from "react";

interface userProfile {
  name: string;
  profilePicture: string;
};

interface NonCloneUserDashboardProps {
  userId: string;
}

export default function NonCloneUserDashboard ({ userId }: NonCloneUserDashboardProps ) {
  const [userProfile, setUserData] = useState<userProfile>({
    name: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (userId) {
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
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId]);



  const router = useRouter();
  
  // const handleFileUpload = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = ".pdf,.txt,.doc,.docx";
  //   input.onchange = (e) => {
  //     const file = (e.target as HTMLInputElement).files?.[0];
  //     if (file) {
  //       const newSource = {
  //         id: uploadedSources.length + 1,
  //         name: file.name,
  //         type: "PDF",
  //         date: new Date().toISOString().split("T")[0],
  //       };
  //       setUploadedSources([...uploadedSources, newSource]);
  //       toast.success(`${file.name} has been added to your knowledge base.`);
  //     }
  //   };
  //   input.click();
  // };

  // const handleProfilePictureUpload = () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = (e) => {
  //     const file = (e.target as HTMLInputElement).files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setUserProfile((prev) => ({
  //           ...prev,
  //           profilePicture: e.target?.result as string,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //       toast.success("Profile picture updated");
  //     }
  //   };
  //   input.click();
  // };

  // const handleDeleteSource = (id: number) => {
  //   setUploadedSources(uploadedSources.filter((source) => source.id !== id));
  //   toast.success("Source removed");
  // };

  // const handleProfileUpdate = () => {
  //   toast.success("Profile updated");
  // };

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
                <h1 className="text-3xl font-serif font-bold">Welcome, {userProfile.name}!</h1>
                <p className="text-muted-foreground">Explore AI clones and manage your profile</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button onClick={() => router.push('/create-clone')} className="bg-primary hover:bg-secondary text-primary-foreground">
                Create Your Clone
              </Button>
            </div>
          </div>

          <QuickStatsGrid userType="non-clone-user"/>
        </div>

        <Tabs defaultValue="clones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="clones">Clones You&apos;ve Talked To</TabsTrigger>
            <TabsTrigger value="profile">Personal Details</TabsTrigger>
          </TabsList>

          <TabsContent value="clones" className="space-y-6">
            <CloneConversationsSection />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSection userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};


