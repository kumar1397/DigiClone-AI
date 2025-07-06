"use client";
import {
  Home,
  ArrowRight,
  Download,
  CircleArrowLeft,
  Search,
  ArrowRightFromLine,
  ArrowLeftFromLine,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Spinner from "@/components/spinner";

interface Clone {
  _id: string;
  clone_name: string;
  image?: string;
  tone: string;
  style: string;
  values: string[];
  catchphrases: string[];
  dos: string;
  donts: string;
  freeform_description: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; bot: { content: string; sources: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [cloneData, setCloneData] = useState<Clone | null>(null);
  const [cloneLoading, setCloneLoading] = useState(true);

  const id = params?.id as string;

  // Fetch clone data
  useEffect(() => {
    const fetchCloneData = async () => {
      if (!id) return;

      try {
        // const token = localStorage.getItem("token");
        // if (!token) {
        //   console.error("No token found");
        //   setCloneLoading(false);
        //   return;
        // }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${id}`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch clone data");
          setCloneLoading(false);
          return;
        }

        const data = await response.json();
        setCloneData(data.data);
        setCloneLoading(false);
      } catch (error) {
        console.error("Error fetching clone data:", error);
        setCloneLoading(false);
      }
    };

    fetchCloneData();
  }, [id]);

  if (!id) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Invalid Chat ID</h2>
          <p className="mt-2">
            Please ensure you have a valid chat ID in the URL.
          </p>
        </div>
      </div>
    );
  }

  const getFaviconUrl = (link: string) => {
    try {
      const url = new URL(link);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
    } catch {
      return "";
    }
  };

  const getDomainName = (link: string) => {
    try {
      const url = new URL(link);
      return url.hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  const handleSend = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setLoading(true);

    const newChatHistory = [
      ...chatHistory,
      {
        user: trimmedPrompt,
        bot: { content: "", sources: "" },
      },
    ];
    setChatHistory(newChatHistory);

    const updatedChatHistory = [...newChatHistory];

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process_query: trimmedPrompt,
          folder: id,
          clone_profile: {
            clone_name: cloneData?.clone_name,
            tone: cloneData?.tone,
            style: cloneData?.style,
            catchphrases: cloneData?.catchphrases,
            values: cloneData?.values,
            dos: cloneData?.dos,
            donts: cloneData?.donts,
            freeform_description: cloneData?.freeform_description,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch from backend.");

      const data = await res.json();

      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: data.response || "No content received.",
        sources: data.sources || [],
      };

      setChatHistory(updatedChatHistory);

      const latestMessagePair =
        updatedChatHistory[updatedChatHistory.length - 1];
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/conversation/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatHistory: [latestMessagePair], // Send only the latest pair
            folder: id,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to save conversation");
      } else {
        const saveData = await response.json();
        console.log("Conversation saved:", saveData);
      }
    } catch (err) {
      console.error("API error:", err);

      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: "Something went wrong. Please try again later.",
        sources: "",
      };

      setChatHistory(updatedChatHistory);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <>
      {cloneLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}
      <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-[#f1f1f1] hidden md:flex md:flex-col md:items-center py-5 transition-all duration-300 ${
          isSidebarOpen ? "w-48" : "w-20"
        }`}
      >
        <div className="flex flex-col gap-4 w-full px-4">
          <button
            className="p-2 hover:bg-[#f9f9f9]/10 rounded-full transition-colors self-end"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ArrowLeftFromLine className="w-5 h-5 text-[#0e0000]" />
            ) : (
              <ArrowRightFromLine className="w-5 h-5 text-[#0e0000]" />
            )}
          </button>
          <button
            className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3"
            onClick={() => router.back()}
          >
            <CircleArrowLeft className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[#0e0000] whitespace-nowrap">Back</span>
            )}
          </button>
          <button
            className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3"
            onClick={() => router.push('/home')}
          >
            <Home className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[#0e0000] whitespace-nowrap">Home</span>
            )}
          </button>
        </div>
        <div className="flex flex-col gap-6 mt-auto w-full px-4">
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3">
            <Download className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
            {isSidebarOpen && (
              <span className="text-[#0e0000] whitespace-nowrap">Download</span>
            )}
          </button>

          {/* Finish Session button */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="bg-[#f1f1f1] px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {cloneLoading ? (
              <>
                <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center animate-pulse" />
                <span className="text-lg font-medium text-[#0e0000] animate-pulse">
                  Loading...
                </span>
              </>
            ) : cloneData ? (
              <>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {cloneData.image ? (
                    <Image
                      src={cloneData.image}
                      alt={cloneData.clone_name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#d9d9d9] flex items-center justify-center">
                      <span className="text-xs text-gray-500">No Image</span>
                    </div>
                  )}
                </div>
                <span className="text-lg font-medium text-[#0e0000]">
                  {cloneData.clone_name}
                </span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center" />
                <span className="text-lg font-medium text-[#0e0000]">
                  Clone Not Found
                </span>
              </>
            )}
          </div>
          <div className="w-64 relative hidden md:block">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              className="bg-white border-none rounded-full h-10 pl-10"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
          {chatHistory.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-2xl space-y-6">
                <h2 className="text-4xl font-bold text-[#0e0000]">
                  Hello, I am {cloneData?.clone_name}
                </h2>
                <p className="text-xl text-gray-600">
                  I&apos;m here to help you learn and grow. How can I assist you
                  today?
                </p>
                {/* Centered Input for initial state */}
                <div className="max-w-xl mx-auto relative mt-8">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="bg-white border-2 border-black rounded-full h-14 pl-8 pr-14 text-black focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] focus:border-black active:shadow-[0_2px_0_#000000] transition-all duration-200 focus:outline-none"
                    placeholder="Type your Questions here"
                    disabled={loading}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition-transform duration-200"
                    onClick={handleSend}
                    disabled={loading}
                  >
                    <ArrowRight className="w-5 h-5 text-[#0e0000]" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 w-full max-w-2xl mx-auto"
              >
                {/* User Message */}
                {chat.user && (
                  <div className="flex justify-end">
                    <div className="bg-[#fed9c5] p-4 rounded-lg text-[#0e0000] shadow-md max-w-[75%]">
                      {chat.user}
                    </div>
                  </div>
                )}
                {/* Bot Response */}
                {chat.bot && (
                  <div className="flex justify-start">
                    <div className="text-[#fff9f9] whitespace-pre-wrap max-w-[75%] space-y-4">
                      {/* Sources block */}
                      {typeof chat.bot.sources === "string" &&
                        chat.bot.sources.trim() !== "" && (
                          <div className="flex flex-nowrap gap-3">
                            {chat.bot.sources
                              .split("\n")
                              .filter((source: string) => source.trim() !== "")
                              .map((source: string, idx: number) => {
                                const match = source.match(/\[(\d+)\]\s*(.+)/);
                                const index = match?.[1] || `${idx + 1}`;
                                const url = match?.[2] || source;

                                const favicon = getFaviconUrl(url);
                                const domain = getDomainName(url);

                                return (
                                  <a
                                    key={idx}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col bg-orange-200 px-4 py-3 rounded-xl hover:bg-orange-300 transition w-[130px] h-[50px] overflow-hidden shadow-sm"
                                  >
                                    {/* Top Line: [Index] | Favicon | Domain */}
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-bold text-[#0e0000]">{`[${index}]`}</span>
                                      {favicon && (
                                        <Image
                                          src={favicon}
                                          alt="favicon"
                                          width={16}
                                          height={16}
                                          className="rounded-full"
                                        />
                                      )}
                                      <span className="text-xs font-semibold text-[#0e0000] truncate">
                                        {domain}
                                      </span>
                                    </div>
                                  </a>
                                );
                              })}
                          </div>
                        )}

                      {/* Main content */}
                      <div className="text-base text-[#0e0000] bg-white shadow-md p-4 rounded-lg">
                        <Markdown>{chat.bot.content}</Markdown>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {loading && (
            <div className="text-[#0e0000] text-lg self-center">Loading...</div>
          )}
        </div>
        {/* Footer Input - Only show when chat has started */}
        {chatHistory.length > 0 && (
          <div className="p-8">
            <div className="max-w-xl mx-auto relative">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="bg-white border-2 border-black rounded-full h-14 pl-8 pr-14 text-black focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] focus:border-black active:shadow-[0_2px_0_#000000] transition-all duration-200 focus:outline-none"
                placeholder="Type your Questions here"
                disabled={loading}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition-transform duration-200"
                onClick={handleSend}
                disabled={loading}
              >
                <ArrowRight className="w-5 h-5 text-[#0e0000]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
