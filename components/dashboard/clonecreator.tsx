"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Knowledge from "./knowledge";
import { useEffect, useState, useCallback } from "react";
import QuickStatsGrid from "./quickstatsgrid";
import ProfileSection from "./profile"
import Training from "./training";
import Personality from "./personality";
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
  youtubeLinkUpload: string[];
  otherLinkUpload: string[];
  Status: string;
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

  const [uploadSources, setUploadSources] = useState<UploadedFile[]>([]);
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
    youtubeLinkUpload: [],
    otherLinkUpload: [],
    Status: "",
  });

  useEffect(() => {
    const fetchCloneInfo = async () => {
      try {
        const url = `api/clones/${cloneId}`;
        const cloneRes = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!cloneRes.ok) {
          throw new Error("Failed to fetch clone data");
        }

        const cloneData = await cloneRes.json();
        console.log("Fetched clone data:", cloneData);
        const data = cloneData.data;

        const parsedClone = {
          clone_id: data.cloneIdStr || "",
          clone_name: data.cloneName || "",
          catchphrases: data.catchphrases || [],
          dos: data.dos || "",
          donts: data.donts || "",
          freeform_description: data.description || "",
          image: data.image || "",
          style: data.style,
          tone: data.tone,
          values: data.values,
          youtubeLinkUpload: data.youtubeLinkUpload,
          otherLinkUpload: data.otherLinkUpload,
          Status: data.status || "",
        };

        setCloneData(parsedClone);

      } catch (err) {
        console.error("🚨 Error fetching clone info:", err);
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


  useEffect(() => {
    if (cloneId) fetchFiles();
  }, [cloneId, fetchFiles]);

  useEffect(() => {
  }, [uploadSources, cloneId, userId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Personal Details</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="personality">Clone Personality</TabsTrigger>
            <TabsTrigger value="training">Training Status</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSection userId={userId} />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Knowledge cloneId={cloneId} cloneData={cloneData} />
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            <Personality cloneData={cloneData} setCloneData={setCloneData} />
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Training cloneData={cloneData} />
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};


