"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Send, Mic, Video } from "lucide-react";
import { useUserStore } from "@/lib/useUserStore";
import { saveConversation } from "@/app/api/actions/conversation";
interface Clone {
  _id: string;
  cloneName: string;
  image?: string;
  tone: string;
  style: string;
  values: string[];
  catchphrases: string[];
  dos: string;
  donts: string;
  description: string;
}

interface Message {
  id: number;
  content: string;
  sender: "user" | "clone";
  timestamp: Date;
}

type MessageEntry = {
  _id: string;
  role: "user" | "clone";
  content: string;
  timestamp: string; // or Date, if parsed
};

export default function CloneChat() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cloneData, setCloneData] = useState<Clone | null>(null);
  const [chatHistory, setChatHistory] = useState<{
    user: string;
    clone: { content: string; sources: string };
  }[]>([]);

  const params = useParams();
  const id = params?.id as string;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { userId } = useUserStore();

  // Fetch clone data
  useEffect(() => {
    const fetchCloneData = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/clones/${id}`);

        if (!res.ok) throw new Error("Failed to fetch clone data");

        const data = await res.json();
        console.log("Fetched clone data:", data);
        setCloneData(data.data);
      } catch (err) {
        console.error("Clone fetch error:", err);
      }
    };
    fetchCloneData();
  }, [id]);

  // Fetch existing conversation
  useEffect(() => {
    const fetchConversation = async () => {
      if (!userId || !id) return;
      console.log("Fetching conversation for:", { userId, cloneId: id });
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/conversations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, cloneId: id }),
        });
        if (!res.ok) throw new Error("Failed to fetch conversation");

        const data = await res.json();
        if (data?.messages?.length) {
          const history = data.messages;
          const loadedMessages: Message[] = [];

          history.forEach((entry: MessageEntry, index: number) => {
            loadedMessages.push({
              id: index + 1,
              content: entry.content,
              sender: entry.role === "user" ? "user" : "clone",
              timestamp: new Date(entry.timestamp),
            });
          });

          setChatHistory(history);
          setMessages(loadedMessages);
          setHasStartedChat(true);
        }
      } catch (err) {
        console.error("Conversation fetch error:", err);
      }
    };
    fetchConversation();
  }, [userId, id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    const prompt = inputMessage.trim();
    const updatedChatHistory = [...chatHistory, { user: prompt, clone: { content: "", sources: "" } }];
    setChatHistory(updatedChatHistory);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          process_query: prompt,
          folder: id,
          clone_profile: {
            clone_name: cloneData?.cloneName,
            tone: cloneData?.tone,
            style: cloneData?.style,
            catchphrases: cloneData?.catchphrases,
            values: cloneData?.values,
            dos: cloneData?.dos,
            donts: cloneData?.donts,
            freeform_description: cloneData?.description,
          },
        }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();
      const cloneMessage: Message = {
        id: messages.length + 2,
        content: data.response || "No response",
        sender: "clone",
        timestamp: new Date(),
      };

      updatedChatHistory[updatedChatHistory.length - 1].clone = {
        content: data.response || "",
        sources: data.sources || "",
      };

      setMessages((prev) => [...prev, cloneMessage]);
      setChatHistory(updatedChatHistory);
      const formattedChatHistory = chatHistory.flatMap(item => [
        { role: "user" as const, content: item.user },
        { role: "clone" as const, content: item.clone.content },
      ]);

      const saveRes = await saveConversation({
        chatHistory: formattedChatHistory,
        userId,
        cloneId: id,
      });
      if (!saveRes) throw new Error("Failed to save conversation");
      if (!hasStartedChat) setHasStartedChat(true);
    } catch (err) {
      console.error("Message send error:", err);

      const errorMessage: Message = {
        id: messages.length + 2,
        content: "Something went wrong. Please try again later.",
        sender: "clone",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container w-full h-full mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="flex flex-row mr-2 sm:mr-3 items-center" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5 mr-2 sm:mr-3" />
                <span className="font-lg">Back</span>
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                  <AvatarImage src={cloneData?.image} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold text-sm sm:text-base">{cloneData?.cloneName}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Content */}
      <div className="flex flex-1 overflow-hidden items-center justify-center">
        <div className="container max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-6 h-full">
          <div className="flex flex-col h-full">
            {!hasStartedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-8 px-3 text-center">
                <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                    <AvatarImage src={cloneData?.image} />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  Hi! I&apos;m {cloneData?.cloneName}&apos;s clone.
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-lg sm:max-w-xl">
                  I&apos;m here to help with life coaching, motivation, and personal development. How can I assist you today?
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-2 sm:px-4 space-y-4 pb-28 sm:pb-32 pt-3 sm:pt-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-md p-3 sm:p-4 rounded-xl text-sm sm:text-base leading-relaxed ${message.sender === 'user'
                        ? 'chat-bubble-user bg-blue-100 text-blue-900'
                        : 'chat-bubble-clone bg-gray-100 text-gray-900'
                        }`}
                    >
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-clone bg-gray-100 p-3 sm:p-4 rounded-xl max-w-[80%] sm:max-w-md">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs sm:text-sm opacity-70 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Section */}
            <div
              className={`${hasStartedChat
                ? 'fixed bottom-0 left-0 right-0 border-t bg-white px-3 sm:px-4 py-3 sm:py-4'
                : 'w-full max-w-xl mx-auto mt-4 sm:mt-6 px-3'
                }`}
            >
              <div className={`${hasStartedChat ? 'max-w-3xl mx-auto' : ''}`}>
                <div className="flex gap-2 sm:gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[48px] sm:min-h-[52px] text-base px-3 sm:px-4 border-black"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground text-base w-12 h-12 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video/Voice Mode Placeholder */}
      {(isVideoMode || isVoiceMode) && (
        <Card className="fixed bottom-20 right-2 sm:right-4 w-72 sm:w-80 shadow-lg">
          <CardContent className="p-3 sm:p-4">
            <div className="text-center space-y-2 sm:space-y-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {isVideoMode ? <Video className="h-7 w-7 sm:h-8 sm:w-8 text-primary" /> : <Mic className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />}
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base">
                  {isVideoMode ? 'Video Mode' : 'Voice Mode'}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Coming soon! This feature will allow {isVideoMode ? 'video' : 'voice'} conversations with your clone.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsVideoMode(false);
                  setIsVoiceMode(false);
                }}
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

};