"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Knowledge from "./knowledge";
import { useEffect, useState, } from "react";
import ProfileSection from "./profile"
import Training from "./training";
import Personality from "./personality";
import { useUserStore } from "@/lib/useUserStore";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
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
  fileUploads?: UploadedFile[];
}

interface UploadedFile {
    id: string;
    fileId: string;
    originalName: string;
    fileSize: number;
    mimeType: string;
    url: string;
    file: File;
}


export default function CloneCreatorDashboard({
  userId,
  cloneId,
}: CloneCreatorDashboardProps) {
  const router = useRouter();
  const { name, image, role } = useUserStore();
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
    fileUploads: [],
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
        const data = cloneData.data;
        const parsedClone = {
          clone_id: data.clone_id || "",
          clone_name: data.clone_name || "",
          catchphrases: data.catchphrases || [],
          dos: data.dos || "",
          donts: data.donts || "",
          freeform_description: data.freeform_description || "",
          image: data.image || "",
          style: data.style,
          tone: data.tone,
          values: data.values,
          youtubeLinkUpload: data.youtubeLinkUpload,
          otherLinkUpload: data.otherLinkUpload,
          Status: data.status || "",
          fileUploads: data.fileUploads || [],
        };

        setCloneData(parsedClone);
        console.log("Fetched clone data:", parsedClone);
      } catch (err) {
        console.error("🚨 Error fetching clone info:", err);
      }
    };

    fetchCloneInfo();
  }, [cloneId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={image} />
                <AvatarFallback>
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-serif font-bold">
                  Welcome, {name}!
                </h1>
                <p className="text-muted-foreground">
                  Explore AI clones and manage your profile
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              {role === 'admin' && (
                <Button onClick={() => router.push('/settings/admin')} className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground">
                    Admin Page
                </Button>
              )}
            </div>
          </div>

          {/* <QuickStatsGrid userType="clone-creator" /> */}
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


