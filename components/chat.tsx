"use client";

import {
  Home,
  Settings,
  ArrowRight,
  Download,
  CircleArrowLeft,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Markdown from "react-markdown";

export default function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { user: string; bot: { content: string; sources: string[] } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    // Step 1: Append user prompt to chat history
    const newChatHistory = [
      ...chatHistory,
      {
        user: prompt,
        bot: { content: "", sources: [] }, // structure for future update
      },
    ];
    setChatHistory(newChatHistory);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process_query: prompt,
          folder: "Suman",
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch from backend.");

      const data = await res.json();

      // Step 2: Update last entry in chat history with full bot object
      const updatedChatHistory = [...newChatHistory];
      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: data.response || "No content received.",
        sources: data.sources || [],
      };

      setChatHistory(updatedChatHistory);
    } catch (err) {
      console.error("API error:", err);

      // Step 3: Graceful degradation on error
      const updatedChatHistory = [...newChatHistory];
      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: "Something went wrong. Please try again later.",
        sources: [],
      };

      setChatHistory(updatedChatHistory);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-32 bg-[#fed9c5] flex flex-col items-center justify-between py-5">
        <div className="flex flex-col gap-4">
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <CircleArrowLeft className="w-6 h-6 text-[#0e0000]" />
          </button>
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Home className="w-6 h-6 text-[#0e0000]" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Download className="w-6 h-6 text-[#0e0000]" />
          </button>
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-[#0e0000]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f9f9f9]">
        {/* Header */}
        <div className="bg-[#fed9c5] px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center" />
            <span className="text-lg font-medium text-[#0e0000]">
              Suman Acharya
            </span>
          </div>
          <div className="w-64 relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              className="bg-white border-none rounded-full h-10 pl-10"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
          {chatHistory.map((chat, index) => (
            <div key={index} className="space-y-2 w-full max-w-xl mx-auto">
              {/* User Message */}
              {chat.user && (
                <div className="bg-[#fed9c5] p-4 rounded-lg self-start text-[#0e0000] shadow-md">
                  {chat.user}
                </div>
              )}
              {/* Bot Response */}
              {chat.bot && (
                <div className="bg-white p-4 rounded-lg self-end text-[#0e0000] shadow-md whitespace-pre-wrap">
                  {chat.bot.sources.length > 0 && (
                    <div className="text-sm text-gray-500 mb-2">
                      Sources: {chat.bot.sources}
                    </div>
                  )}
                  <Markdown>{chat.bot.content}</Markdown>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-[#0e0000] text-lg self-center">Loading...</div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-8">
          <div className="max-w-xl mx-auto relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-[#f7f7f7] border-none rounded-full h-14 pl-8 pr-14 text-[#0e0000]/50"
              placeholder="Type your Questions here"
              disabled={loading}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent"
              onClick={handleSend}
              disabled={loading}
            >
              <ArrowRight className="w-5 h-5 text-[#0e0000]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
