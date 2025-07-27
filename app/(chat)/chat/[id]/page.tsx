"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft, Send, ThumbsUp, ThumbsDown,
  Mic, Video, 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from 'react-hot-toast';
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
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
  sender: 'user' | 'clone';
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
}

const CloneChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cloneData, setCloneData] = useState<Clone | null>(null);
  const [chatHistory, setChatHistory] = useState<
    { user: string; bot: { content: string; sources: string } }[]
  >([]);
  const params = useParams();
  const id = params?.id as string;

  // Fetch clone data
  useEffect(() => {
    const fetchCloneData = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/${id}`,
          {
            method: "GET",
            headers: {
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch clone data");
          return;
        }

        const data = await response.json();
        setCloneData(data.data);
      } catch (error) {
        console.error("Error fetching clone data:", error);
      }
    };

    fetchCloneData();
  }, [id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const trimmedPrompt = inputMessage.trim();
    if (!trimmedPrompt) return;

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

      if (!res.ok) throw new Error("Failed to fetch from backend.");

      const data = await res.json();

      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: data.response || "No content received.",
        sources: data.sources || [],
      };

      setChatHistory(updatedChatHistory);

      // Add the bot response to messages
      const cloneResponse: Message = {
        id: messages.length + 2,
        content: data.response || "No content received.",
        sender: 'clone',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, cloneResponse]);

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
            chatHistory: [latestMessagePair], 
            folder: id,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to save conversation");
      } else {
        const saveData = await response.json();
        console.log(saveData);
      }
    } catch (err) {
      console.error("API error:", err);

      updatedChatHistory[updatedChatHistory.length - 1].bot = {
        content: "Something went wrong. Please try again later.",
        sources: "",
      };

      setChatHistory(updatedChatHistory);

      // Add error message to messages
      const errorResponse: Message = {
        id: messages.length + 2,
        content: "Something went wrong. Please try again later.",
        sender: 'clone',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedback = (messageId: number, feedback: 'positive' | 'negative') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === feedback ? null : feedback }
          : msg
      )
    );

    toast.success("Feedback recorded");
  };

  // const handleShare = () => {
  //   navigator.clipboard.writeText(window.location.href);
  //   toast.success("Link copied!");
  // };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container w-full h-full mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/explore">
                <button className="flex flex-row mr-3 items-center">
                  <ArrowLeft className="h-5 w-5 mr-3" />
                  <span className="fonnt-lg">Back</span>
                </button>
              </Link>

              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={cloneData?.image} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold">{cloneData?.cloneName}</h1>
                </div>
                {/* <Badge variant="secondary" className="ml-2">
                  ⭐ 4.9 
                </Badge> */}
              </div>
            </div>

            {/* <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={isVoiceMode ? "bg-primary text-primary-foreground" : ""}
              >
                {isVoiceMode ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsVideoMode(!isVideoMode)}
                className={isVideoMode ? "bg-primary text-primary-foreground" : ""}
              >
                {isVideoMode ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Chat Content */}
      <div className="flex flex-1 overflow-hidden items-center justify-center">
        <div className="container max-w-4xl mx-auto px-4 py-6 h-full">
          <div className="flex flex-col h-full">

            {!hasStartedChat ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="text-center space-y-6 px-4">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={cloneData?.image} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="text-3xl font-semibold">
                    Hi! I&apos;m {cloneData?.cloneName}&apos;s clone.
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl">
                    I&apos;m here to help with life coaching, motivation, and personal development. How can I assist you today?
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-32 pt-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-4 rounded-xl text-base leading-relaxed ${message.sender === 'user'
                      ? 'chat-bubble-user bg-blue-100 text-blue-900'
                      : 'chat-bubble-clone bg-gray-100 text-gray-900'
                      }`}>
                      <ReactMarkdown >
                        {message.content}
                      </ReactMarkdown>

                      {message.sender === 'clone' && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-current/10">
                          <span className="text-xs opacity-70">Was this helpful?</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`p-1 h-auto ${message.feedback === 'positive' ? 'bg-success/20' : ''}`}
                            onClick={() => handleFeedback(message.id, 'positive')}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`p-1 h-auto ${message.feedback === 'negative' ? 'bg-destructive/20' : ''}`}
                            onClick={() => handleFeedback(message.id, 'negative')}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="chat-bubble-clone bg-gray-100 p-4 rounded-xl max-w-md">
                      <div className="flex items-center gap-1">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm opacity-70 ml-2">typing...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Shared Input */}
            <div
              className={`${hasStartedChat
                ? 'fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-4'
                : 'w-[50rem] max-w-xl mx-auto mt-6'
                }`}
            >
              <div className={`${hasStartedChat ? 'max-w-3xl mx-auto' : ''}`}>
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 min-h-[52px] text-base px-4 border-black"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-primary hover:bg-secondary text-primary-foreground text-base w-13 h-13 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
        <Card className="fixed bottom-20 right-4 w-80 shadow-lg">
          <CardContent className="p-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                {isVideoMode ? <Video className="h-8 w-8 text-primary" /> : <Mic className="h-8 w-8 text-primary" />}
              </div>
              <div>
                <h4 className="font-semibold">
                  {isVideoMode ? 'Video Mode' : 'Voice Mode'}
                </h4>
                <p className="text-sm text-muted-foreground">
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

export default CloneChat;