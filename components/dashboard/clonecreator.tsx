import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  Video,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import QuickStatsGrid from "./quickstatsgrid";
import ProfileSection from "./profile"
import { toast } from "react-hot-toast";

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
}

interface userProfile {
  name: string;
  profilePicture: string;
};

const CloneCreatorDashboard = ({
  userId,
  cloneId,
}: CloneCreatorDashboardProps) => {

  const [userProfile, setUserData] = useState<userProfile>({
    name: "",
    profilePicture: "",
  });
  console.log("User ID:", userId);
  console.log("Clone ID:", cloneId);
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
  });
  // ✅ Enhanced parseArray function

  function parseArray(arr: any): string[] {
    try {
      if (Array.isArray(arr) && typeof arr[0] === "string") {
        return JSON.parse(arr[0]);
      }
    } catch (e) {
      console.error("Failed to parse array:", arr, e);
    }
    return [];
  }

  useEffect(() => {
    const fetchCloneInfo = async () => {
      try {
        if (cloneId) {
          const cloneRes = await fetch(
            `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${cloneId}`
          );
          if (!cloneRes.ok) {
            throw new Error("Failed to fetch clone data");
          }
          const cloneData = await cloneRes.json();
          const data = cloneData.data; // ✅ get actual clone data from "data" field

          const parsedClone = {
            clone_id: data.cloneIdStr || "",         
            clone_name: data.cloneName || "",
            catchphrases: data.catchphrases || [],
            dos: data.dos || "",
            donts: data.donts || "",
            freeform_description: data.description || "",
            image: data.image || "",
            style: parseArray(data.style),
            tone: parseArray(data.tone),
            values: parseArray(data.values),
          };

          console.log("Parsed clone data:", parsedClone);
          setCloneData(parsedClone);
        } else {
          console.log("No cloneId found for user.");
        }
      } catch (err) {
        console.error("Error fetching clone info:", err);
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Personal Details</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            <TabsTrigger value="personality">Clone Personality</TabsTrigger>
            {/* <TabsTrigger value="training">Training Status</TabsTrigger>
            <TabsTrigger value="preview">Preview & Test</TabsTrigger> */}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileSection userId={userId} />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Knowledge Sources</CardTitle>
                <CardDescription>
                  Upload documents, add URLs, or paste content to train your
                  clone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card
                    className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors"
                  >
                    <CardContent className="p-6 text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Upload Documents</h4>
                      <p className="text-sm text-muted-foreground">
                        PDF, TXT, DOC files
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">YouTube Videos</h4>
                      <p className="text-sm text-muted-foreground">
                        Paste video URLs
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <LinkIcon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Website Content</h4>
                      <p className="text-sm text-muted-foreground">
                        Blogs, articles, pages
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Uploaded Sources Table */}
                {/* <div className="space-y-4">
                  <h4 className="font-semibold">
                    Uploaded Sources ({uploadedSources.length})
                  </h4>
                  <div className="space-y-2">
                    {uploadedSources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{source.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {source.type} • {source.date}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteSource(source.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personality Setup Tab */}
          <TabsContent value="personality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Clone Personality</CardTitle>
                <CardDescription>
                  Define your clone&apos;s tone, style, catchphrases, do&apos;s & don&apos;ts, and a freeform description.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Tone
                    </Label>
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                      {["Friendly","Professional","Visionary","Humble","Motivational","Empathetic","Witty","Authoritative","Caring","Inspiring"].map((tone) => (
                        <div key={tone} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`tone-${tone}`}
                            checked={cloneData.tone.includes(tone)}
                            onChange={e => {
                              setCloneData(prev => ({
                                ...prev,
                                tone: e.target.checked
                                  ? [...prev.tone, tone]
                                  : prev.tone.filter(t => t !== tone)
                              }));
                            }}
                          />
                          <Label htmlFor={`tone-${tone}`} className="text-sm cursor-pointer">
                            {tone}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-semibold mb-4 block">
                      Style
                    </Label>
                    <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2">
                      {["Storytelling","Technical explanation","Direct and concise","Conversational","Philosophical","Analytical","Casual","Educational"].map((style) => (
                        <div key={style} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`style-${style}`}
                            checked={cloneData.style.includes(style)}
                            onChange={e => {
                              setCloneData(prev => ({
                                ...prev,
                                style: e.target.checked
                                  ? [...prev.style, style]
                                  : prev.style.filter(s => s !== style)
                              }));
                            }}
                          />
                          <Label htmlFor={`style-${style}`} className="text-sm cursor-pointer">
                            {style}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

  
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Catchphrases
                  </Label>
                  <Textarea
                    value={cloneData.catchphrases.join("\n")}
                    onChange={e => setCloneData(prev => ({
                      ...prev,
                      catchphrases: e.target.value.split(/\n|,/).map(s => s.trim()).filter(Boolean)
                    }))}
                    placeholder="Enter signature phrases, separated by commas or new lines"
                    className="min-h-[100px]"
                  />
                </div>


                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dos" className="text-base font-semibold">
                      Do&apos;s
                    </Label>
                    <Textarea
                      id="dos"
                      value={cloneData.dos}
                      onChange={e => setCloneData(prev => ({ ...prev, dos: e.target.value }))}
                      placeholder="Things the clone should always do while answering"
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="donts" className="text-base font-semibold">
                      Don&apos;ts
                    </Label>
                    <Textarea
                      id="donts"
                      value={cloneData.donts}
                      onChange={e => setCloneData(prev => ({ ...prev, donts: e.target.value }))}
                      placeholder="Things the clone should avoid while answering"
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                </div>

              
                <div>
                  <Label className="text-base font-semibold mb-2 block">
                    Freeform Description
                  </Label>
                  <Textarea
                    value={cloneData.freeform_description}
                    onChange={e => setCloneData(prev => ({ ...prev, freeform_description: e.target.value }))}
                    placeholder="Describe your clone's personality, approach, and unique characteristics in detail..."
                    className="min-h-[150px]"
                  />
                </div>

                <Button
                  className="bg-primary hover:bg-secondary text-primary-foreground"
                  onClick={async () => {
                   
                    try {
                      const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${cloneData.clone_id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          tone: cloneData.tone,
                          style: cloneData.style,
                          catchphrases: cloneData.catchphrases,
                          dos: cloneData.dos,
                          donts: cloneData.donts,
                          freeform_description: cloneData.freeform_description,
                        }),
                      });
                      if (!res.ok) throw new Error("Failed to update clone data");
                      toast.success("Personality updated!");
                    } catch (err) {
                      toast.error("Failed to update personality");
                    } finally {
                    }
                  }}
                 
                >
                  vvu
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Status Tab */}
          {/* <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Training Progress
                </CardTitle>
                <CardDescription>
                  Your clone is learning from your knowledge sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{trainingProgress}% complete</span>
                  </div>
                  <Progress value={trainingProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Estimated time remaining: 2-3 hours
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Content Processing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">✓ Complete</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Personality Training</span>
                    </div>
                    <p className="text-sm text-muted-foreground">⟳ In Progress</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <span className="font-medium">Quality Testing</span>
                    </div>
                    <p className="text-sm text-muted-foreground">⧖ Pending</p>
                  </div>
                </div>

                {cloneStatus === 'live' && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="h-5 w-5 text-success" />
                      <span className="font-semibold text-success">Your clone is live!</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your digital clone is ready to help others. Share your clone link to start conversations.
                    </p>
                    <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                      Share Clone Link
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Preview & Test Tab */}
          {/* <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Test Your Clone</CardTitle>
                <CardDescription>
                  Chat with your clone to see how it responds and provide feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 h-96 flex flex-col">
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="chat-bubble-clone">
                      Hi! I&apos;m Sarah&apos;s digital clone. I&apos;m here to help with life coaching, motivation, and personal development. What would you like to talk about?
                    </div>
                    
                    <div className="chat-bubble-user">
                      How can I overcome procrastination?
                    </div>
                    
                    <div className="chat-bubble-clone">
                      Procrastination often stems from fear of failure or perfectionism. Here&apos;s my approach: Start with the &quot;2-minute rule&quot; - if something takes less than 2 minutes, do it now. For bigger tasks, break them into tiny steps and celebrate small wins. What specific task are you avoiding right now?
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button size="sm" variant="ghost" className="p-1">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1">
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Suggest Correction
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Test your clone with a question..." />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default CloneCreatorDashboard;
