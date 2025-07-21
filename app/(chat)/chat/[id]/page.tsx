"use client";


// export default function ChatPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [prompt, setPrompt] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [cloneData, setCloneData] = useState<Clone | null>(null);
//   const [cloneLoading, setCloneLoading] = useState(true);


//   const handleSend = async () => {
//     const trimmedPrompt = prompt.trim();
//     if (!trimmedPrompt) return;

//     setLoading(true);

//     const newChatHistory = [
//       ...chatHistory,
//       {
//         user: trimmedPrompt,
//         bot: { content: "", sources: "" },
//       },
//     ];
//     setChatHistory(newChatHistory);

//     const updatedChatHistory = [...newChatHistory];

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           process_query: trimmedPrompt,
//           folder: id,
//           clone_profile: {
//             clone_name: cloneData?.clone_name,
//             tone: cloneData?.tone,
//             style: cloneData?.style,
//             catchphrases: cloneData?.catchphrases,
//             values: cloneData?.values,
//             dos: cloneData?.dos,
//             donts: cloneData?.donts,
//             freeform_description: cloneData?.freeform_description,
//           },
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to fetch from backend.");

//       const data = await res.json();

//       updatedChatHistory[updatedChatHistory.length - 1].bot = {
//         content: data.response || "No content received.",
//         sources: data.sources || [],
//       };

//       setChatHistory(updatedChatHistory);

//       const latestMessagePair =
//         updatedChatHistory[updatedChatHistory.length - 1];
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/conversation/save`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             chatHistory: [latestMessagePair], // Send only the latest pair
//             folder: id,
//           }),
//         }
//       );

//       if (!response.ok) {
//         console.error("Failed to save conversation");
//       } else {
//         const saveData = await response.json();
//         console.log("Conversation saved:", saveData);
//       }
//     } catch (err) {
//       console.error("API error:", err);

//       updatedChatHistory[updatedChatHistory.length - 1].bot = {
//         content: "Something went wrong. Please try again later.",
//         sources: "",
//       };

//       setChatHistory(updatedChatHistory);
//     } finally {
//       setLoading(false);
//       setPrompt("");
//     }
//   };

//   return (
//     <>
//       {/* {cloneLoading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Spinner />
//         </div>
//       )} */}
//       <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`bg-[#f1f1f1] hidden md:flex md:flex-col md:items-center py-5 transition-all duration-300 ${
//           isSidebarOpen ? "w-48" : "w-20"
//         }`}
//       >
//         <div className="flex flex-col gap-4 w-full px-4">
//           <button
//             className="p-2 hover:bg-[#f9f9f9]/10 rounded-full transition-colors self-end"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? (
//               <ArrowLeftFromLine className="w-5 h-5 text-[#0e0000]" />
//             ) : (
//               <ArrowRightFromLine className="w-5 h-5 text-[#0e0000]" />
//             )}
//           </button>
//           <button
//             className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3"
//             onClick={() => router.back()}
//           >
//             <CircleArrowLeft className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
//             {isSidebarOpen && (
//               <span className="text-[#0e0000] whitespace-nowrap">Back</span>
//             )}
//           </button>
//           <button
//             className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3"
//             onClick={() => router.push('/home')}
//           >
//             <Home className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
//             {isSidebarOpen && (
//               <span className="text-[#0e0000] whitespace-nowrap">Home</span>
//             )}
//           </button>
//         </div>
//         <div className="flex flex-col gap-6 mt-auto w-full px-4">
//           <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors flex items-center gap-3">
//             <Download className="w-6 h-6 text-[#0e0000] flex-shrink-0" />
//             {isSidebarOpen && (
//               <span className="text-[#0e0000] whitespace-nowrap">Download</span>
//             )}
//           </button>

//           {/* Finish Session button */}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col bg-white">
//         {/* Header */}
//         <div className="bg-[#f1f1f1] px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             {cloneLoading ? (
//               <>
//                 <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center animate-pulse" />
//                 <span className="text-lg font-medium text-[#0e0000] animate-pulse">
//                   Loading...
//                 </span>
//               </>
//             ) : cloneData ? (
//               <>
//                 <div className="w-12 h-12 rounded-full overflow-hidden">
//                   {cloneData.image ? (
//                     <Image
//                       src={cloneData.image}
//                       alt={cloneData.clone_name}
//                       width={48}
//                       height={48}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-[#d9d9d9] flex items-center justify-center">
//                       <span className="text-xs text-gray-500">No Image</span>
//                     </div>
//                   )}
//                 </div>
//                 <span className="text-lg font-medium text-[#0e0000]">
//                   {cloneData.clone_name}
//                 </span>
//               </>
//             ) : (
//               <>
//                 <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center" />
//                 <span className="text-lg font-medium text-[#0e0000]">
//                   Clone Not Found
//                 </span>
//               </>
//             )}
//           </div>
//           <div className="w-64 relative hidden md:block">
//             <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             <Input
//               className="bg-white border-none rounded-full h-10 pl-10"
//               placeholder="Search..."
//             />
//           </div>
//         </div>

//         {/* Chat Content */}
//         <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
//           {chatHistory.length === 0 ? (
//             <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
//               <div className="max-w-2xl space-y-6">
//                 <h2 className="text-4xl font-bold text-[#0e0000]">
//                   Hello, I am {cloneData?.clone_name}
//                 </h2>
//                 <p className="text-xl text-gray-600">
//                   I&apos;m here to help you learn and grow. How can I assist you
//                   today?
//                 </p>
//                 {/* Centered Input for initial state */}
//                 <div className="max-w-xl mx-auto relative mt-8">
//                   <Input
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                     className="bg-white border-2 border-black rounded-full h-14 pl-8 pr-14 text-black focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] focus:border-black active:shadow-[0_2px_0_#000000] transition-all duration-200 focus:outline-none"
//                     placeholder="Type your Questions here"
//                     disabled={loading}
//                   />
//                   <button
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition-transform duration-200"
//                     onClick={handleSend}
//                     disabled={loading}
//                   >
//                     <ArrowRight className="w-5 h-5 text-[#0e0000]" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             chatHistory.map((chat, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-2 w-full max-w-2xl mx-auto"
//               >
//                 {/* User Message */}
//                 {chat.user && (
//                   <div className="flex justify-end">
//                     <div className="bg-[#fed9c5] p-4 rounded-lg text-[#0e0000] shadow-md max-w-[75%]">
//                       {chat.user}
//                     </div>
//                   </div>
//                 )}
//                 {/* Bot Response */}
//                 {chat.bot && (
//                   <div className="flex justify-start">
//                     <div className="text-[#fff9f9] whitespace-pre-wrap max-w-[75%] space-y-4">
//                       {/* Sources block */}
//                       {typeof chat.bot.sources === "string" &&
//                         chat.bot.sources.trim() !== "" && (
//                           <div className="flex flex-nowrap gap-3">
//                             {chat.bot.sources
//                               .split("\n")
//                               .filter((source: string) => source.trim() !== "")
//                               .map((source: string, idx: number) => {
//                                 const match = source.match(/\[(\d+)\]\s*(.+)/);
//                                 const index = match?.[1] || `${idx + 1}`;
//                                 const url = match?.[2] || source;

//                                 const favicon = getFaviconUrl(url);
//                                 const domain = getDomainName(url);

//                                 return (
//                                   <a
//                                     key={idx}
//                                     href={url}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex flex-col bg-orange-200 px-4 py-3 rounded-xl hover:bg-orange-300 transition w-[130px] h-[50px] overflow-hidden shadow-sm"
//                                   >
//                                     {/* Top Line: [Index] | Favicon | Domain */}
//                                     <div className="flex items-center gap-2 mb-1">
//                                       <span className="text-xs font-bold text-[#0e0000]">{`[${index}]`}</span>
//                                       {favicon && (
//                                         <Image
//                                           src={favicon}
//                                           alt="favicon"
//                                           width={16}
//                                           height={16}
//                                           className="rounded-full"
//                                         />
//                                       )}
//                                       <span className="text-xs font-semibold text-[#0e0000] truncate">
//                                         {domain}
//                                       </span>
//                                     </div>
//                                   </a>
//                                 );
//                               })}
//                           </div>
//                         )}

//                       {/* Main content */}
//                       <div className="text-base text-[#0e0000] bg-white shadow-md p-4 rounded-lg">
//                         <Markdown>{chat.bot.content}</Markdown>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}

//           {loading && (
//             <div className="text-[#0e0000] text-lg self-center">Loading...</div>
//           )}
//         </div>
//         {/* Footer Input - Only show when chat has started */}
//         {chatHistory.length > 0 && (
//           <div className="p-8">
//             <div className="max-w-xl mx-auto relative">
//               <Input
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 className="bg-white border-2 border-black rounded-full h-14 pl-8 pr-14 text-black focus:shadow-[0_0_15px_rgba(0,0,0,0.2)] focus:border-black active:shadow-[0_2px_0_#000000] transition-all duration-200 focus:outline-none"
//                 placeholder="Type your Questions here"
//                 disabled={loading}
//               />
//               <button
//                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:scale-110 transition-transform duration-200"
//                 onClick={handleSend}
//                 disabled={loading}
//               >
//                 <ArrowRight className="w-5 h-5 text-[#0e0000]" />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//     </>
//   );
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, Send, ThumbsUp, ThumbsDown, Share2, 
  Mic, MicOff, Video, VideoOff, Volume2, VolumeX 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import {toast} from 'react-hot-toast';
import Link from "next/link";

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
  const [isMuted, setIsMuted] = useState(false);
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
              // Authorization: `Bearer ${token}`,
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


  //   const getFaviconUrl = (link: string) => {
  //     try {
  //       const url = new URL(link);
  //       return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
  //     } catch {
  //       return "";
  //     }
  //   };

  // const getDomainName = (link: string) => {
  //   try {
  //     const url = new URL(link);
  //     return url.hostname.replace("www.", "");
  //   } catch {
  //     return "";
  //   }
  // };

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
    
    // Mark chat as started after first message
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

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
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/discover">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={cloneData?.image} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-semibold">{cloneData?.clone_name}</h1>
                </div>
                <Badge variant="secondary" className="ml-2">
                  ⭐ 4.9 
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </header>

      {/* Chat Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container max-w-4xl mx-auto px-4 py-6 h-full">
          <div className="h-full flex flex-col">
            {!hasStartedChat ? (
              /* Initial centered layout */
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={cloneData?.image} />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="text-2xl font-semibold">
                    Hi! I&apos;m {cloneData?.clone_name}&apos;s clone.
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md">
                    I&apos;m here to help with life coaching, motivation, and personal development. How can I assist you today?
                  </p>
                </div>
                
                <div className="w-full max-w-md">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 min-h-[44px]"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-primary hover:bg-secondary text-primary-foreground px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Chat layout with messages */
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-sm lg:max-w-md ${
                        message.sender === 'user' 
                          ? 'chat-bubble-user' 
                          : 'chat-bubble-clone'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.sender === 'clone' && (
                          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-current/10">
                            <span className="text-xs opacity-70">Was this helpful?</span>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className={`p-1 h-auto ${
                                message.feedback === 'positive' ? 'bg-success/20' : ''
                              }`}
                              onClick={() => handleFeedback(message.id, 'positive')}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className={`p-1 h-auto ${
                                message.feedback === 'negative' ? 'bg-destructive/20' : ''
                              }`}
                              onClick={() => handleFeedback(message.id, 'negative')}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="chat-bubble-clone">
                        <div className="flex items-center gap-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm opacity-70 ml-2">typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input - Bottom positioned */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 min-h-[44px]"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-primary hover:bg-secondary text-primary-foreground px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
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