import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, } from "lucide-react";
import { useEffect, useState } from "react";

interface CloneProfile {
  clone_id: number;
  clone_name: string;
  image: string;
}
interface NonCloneUserDashboardProps {
  userId: string;
}


// Sample hard-coded data


const CloneConversationsSection = ({ userId }: NonCloneUserDashboardProps) => {

  const [clones, setClones] = useState<CloneProfile[]>([])
  const fetchClones = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/conversation/${userId}`);
      const data = await response.json();

      if (response.ok) {
        console.log('Clones:', data.clones);
        setClones(data.clones)
        // Use data.clones in your component state
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };
  useEffect(() => {
    fetchClones();
  }, [userId]);

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
            <div key={clone.clone_id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={clone.image} />
                  <AvatarFallback>{clone.clone_name}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{clone.clone_name}</h4>
                  <p className="text-xs text-muted-foreground">Last chat: 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">18 conversations</p>
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
