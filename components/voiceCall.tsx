import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Mic, MicOff, Play, Pause, ArrowLeft, Phone,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
interface TranscriptMessage {
    id: number;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    isPlaying?: boolean;
}

type CallStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

const VoiceCall = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>('idle');
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
    const [waveformActive, setWaveformActive] = useState(false);
    const [playingMessageId, setPlayingMessageId] = useState<number | null>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Sample AI responses for demo
    const aiResponses = [
        "Hello! I'm your AI assistant. How can I help you today?",
        "That's a great question! Let me think about that for a moment.",
        "I understand what you're asking. Here's what I think...",
        "Absolutely! That makes perfect sense. Here's my perspective on that.",
        "That's an interesting point. Let me provide you with some insights.",
    ];

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [transcript]);

    const handleStartRecording = () => {
        setIsRecording(true);
        setCallStatus('listening');
        setWaveformActive(true);

        // Simulate recording duration (3-5 seconds)
        const recordingDuration = Math.random() * 2000 + 3000;

        setTimeout(() => {
            handleStopRecording();
        }, recordingDuration);
    };

    const handleStopRecording = () => {
        setIsRecording(false);
        setWaveformActive(false);
        setCallStatus('thinking');

        // Simulate user speech transcription
        const userMessages = [
            "Hello, can you help me with something?",
            "What's the weather like today?",
            "Can you tell me a joke?",
            "How does artificial intelligence work?",
            "What are your capabilities?",
        ];

        const userMessage: TranscriptMessage = {
            id: transcript.length + 1,
            content: userMessages[Math.floor(Math.random() * userMessages.length)],
            sender: 'user',
            timestamp: new Date(),
        };

        setTranscript(prev => [...prev, userMessage]);

        // Simulate AI thinking time (1-2 seconds)
        setTimeout(() => {
            setCallStatus('speaking');

            const aiMessage: TranscriptMessage = {
                id: transcript.length + 2,
                content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
                sender: 'ai',
                timestamp: new Date(),
            };

            setTranscript(prev => [...prev, aiMessage]);

            // Simulate AI speaking duration (2-4 seconds)
            setTimeout(() => {
                setCallStatus('idle');
            }, Math.random() * 2000 + 2000);
        }, Math.random() * 1000 + 1000);
    };

    const handlePlayAIMessage = (messageId: number) => {
        if (playingMessageId === messageId) {
            setPlayingMessageId(null);
            toast.success("Playback stopped")
        } else {
            setPlayingMessageId(messageId);
            toast.success("Playing audio")
            setTimeout(() => {
                setPlayingMessageId(null);
            }, 3000);
        }
    };

    const getStatusText = () => {
        switch (callStatus) {
            case 'listening': return 'Listening...';
            case 'thinking': return 'Thinking...';
            case 'speaking': return 'Speaking...';
            default: return 'Ready to chat';
        }
    };

    const getStatusColor = () => {
        switch (callStatus) {
            case 'listening': return 'bg-primary';
            case 'thinking': return 'bg-accent';
            case 'speaking': return 'bg-success';
            default: return 'bg-muted';
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
                <div className="container max-w-md mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back
                            </Button>
                        </Link>

                        <div className="text-center">
                            <h1 className="text-lg font-semibold">AI Call</h1>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor()} ${callStatus !== 'idle' ? 'animate-pulse' : ''
                                    }`} />
                                <span className="text-sm text-muted-foreground">
                                    {getStatusText()}
                                </span>
                            </div>
                        </div>

                        <div className="w-16" /> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            {/* Transcript Area */}
            <div className="flex-1 overflow-hidden pb-32">
                <div className="container max-w-md mx-auto px-4 py-6 h-full">
                    <ScrollArea className="h-full" ref={scrollAreaRef}>
                        <div className="space-y-4 pb-4">
                            {transcript.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Phone className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">Start your conversation</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Tap the microphone to begin speaking with your AI assistant
                                    </p>
                                </div>
                            ) : (
                                transcript.map((message) => (
                                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                        }`}>
                                        <Card className={`max-w-[80%] ${message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'
                                            }`}>
                                            <CardContent className="p-3">
                                                <div className="flex items-start gap-2">
                                                    <div className="flex-1">
                                                        <p className="text-sm leading-relaxed animate-fade-in">
                                                            {message.content}
                                                        </p>
                                                        <span className="text-xs opacity-70 mt-1 block">
                                                            {message.timestamp.toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>

                                                    {message.sender === 'ai' && (
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className={`p-1 h-auto ${playingMessageId === message.id ? 'animate-pulse' : ''
                                                                }`}
                                                            onClick={() => handlePlayAIMessage(message.id)}
                                                        >
                                                            {playingMessageId === message.id ? (
                                                                <Pause className="h-3 w-3" />
                                                            ) : (
                                                                <Play className="h-3 w-3" />
                                                            )}
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </div>

            {/* Waveform Visualization - Fixed position when active */}
            {waveformActive && (
                <div className="fixed bottom-32 left-0 right-0 z-40">
                    <div className="container max-w-md mx-auto px-4 py-4">
                        <div className="flex items-center justify-center gap-1 h-12">
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-primary rounded-full animate-pulse"
                                    style={{
                                        height: `${Math.random() * 40 + 10}px`,
                                        animationDelay: `${i * 0.1}s`,
                                        animationDuration: '0.5s'
                                    }}
                                />
                            ))}
                        </div>
                        <p className="text-center text-sm text-muted-foreground mt-2">
                            Speak now...
                        </p>
                    </div>
                </div>
            )}

            {/* Microphone Button - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t z-50">
                <div className="container max-w-md mx-auto px-4 py-6">
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            className={`w-20 h-20 rounded-full transition-all duration-300 ${isRecording
                                    ? 'bg-destructive hover:bg-destructive/90 scale-110 animate-pulse-glow'
                                    : 'bg-primary hover:bg-primary/90'
                                } ${callStatus === 'thinking' || callStatus === 'speaking' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={isRecording ? handleStopRecording : handleStartRecording}
                            disabled={callStatus === 'thinking' || callStatus === 'speaking'}
                        >
                            {isRecording ? (
                                <MicOff className="h-8 w-8" />
                            ) : (
                                <Mic className="h-8 w-8" />
                            )}
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-sm text-muted-foreground">
                            {isRecording ? 'Tap to stop recording' : 'Tap to start speaking'}
                        </p>
                    </div>

                    {/* Status Bar */}
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4">
                        <Badge variant="secondary" className="gap-1">
                            <div className="w-2 h-2 bg-success rounded-full" />
                            Connected
                        </Badge>
                        <span>•</span>
                        <span>AI Voice Assistant</span>
                        <span>•</span>
                        <span>Real-time</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceCall;