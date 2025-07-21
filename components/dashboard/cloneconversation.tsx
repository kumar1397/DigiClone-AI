import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp } from "lucide-react";

interface Clone {
  id: number;
  name: string;
  type: string;
  lastChat: string;
  avatar: string;
  totalChats: number;
  rating: number;
}

interface CloneConversationsSectionProps {
  clones?: Clone[];
}

// Sample hard-coded data
const sampleClones: Clone[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Customer Service",
    lastChat: "2 hours ago",
    avatar: "/avatars/sarah.jpg",
    totalChats: 15,
    rating: 4.8
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Technical Support",
    lastChat: "1 day ago",
    avatar: "/avatars/mike.jpg",
    totalChats: 8,
    rating: 4.6
  },
  {
    id: 3,
    name: "Emma Davis",
    type: "Sales Assistant",
    lastChat: "3 days ago",
    avatar: "/avatars/emma.jpg",
    totalChats: 12,
    rating: 4.9
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    type: "Product Specialist",
    lastChat: "1 week ago",
    avatar: "/avatars/alex.jpg",
    totalChats: 6,
    rating: 4.7
  },
  {
    id: 5,
    name: "Lisa Thompson",
    type: "Marketing Expert",
    lastChat: "2 weeks ago",
    avatar: "/avatars/lisa.jpg",
    totalChats: 9,
    rating: 4.5
  }
];

const CloneConversationsSection = ({ clones = sampleClones }: CloneConversationsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif">Your Clone Conversations</CardTitle>
        <CardDescription>
          AI clones you&apos;ve interacted with and your conversation history
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clones.map((clone) => (
            <div key={clone.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={clone.avatar} />
                  <AvatarFallback>{clone.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{clone.name}</h4>
                  <p className="text-sm text-muted-foreground">{clone.type}</p>
                  <p className="text-xs text-muted-foreground">Last chat: {clone.lastChat}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{clone.totalChats} conversations</p>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-green-500" />
                    <span className="text-xs">{clone.rating}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Again
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CloneConversationsSection;
