
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, MessageCircle, Users, ThumbsUp, Clock } from "lucide-react";

interface QuickStat {
  icon: LucideIcon;
  value: string;
  label: string;
  color: string;
}

interface QuickStatsGridProps {
  userType: 'clone-creator' | 'non-clone-user';
}

const QuickStatsGrid = ({ userType }: QuickStatsGridProps) => {
  // Clone Creator Stats (hardcoded)
  const cloneCreatorStats: QuickStat[] = [
    { icon: MessageCircle, value: "1,247", label: "Total Conversations", color: "text-primary" },
    { icon: Users, value: "342", label: "Unique Users", color: "text-accent" },
    { icon: Clock, value: "8.5m", label: "Avg. Chat Duration", color: "text-success" },
    { icon: ThumbsUp, value: "94%", label: "Positive Feedback", color: "text-green-500" }
  ];

  // Non-Clone User Stats (hardcoded)
  const nonCloneUserStats: QuickStat[] = [
    { icon: MessageCircle, value: "156", label: "Total Conversations", color: "text-primary" },
    { icon: Users, value: "23", label: "Clones Discovered", color: "text-accent" },
    { icon: ThumbsUp, value: "4.2", label: "Avg. Experience Rating", color: "text-green-500" }
  ];

  const stats = userType === 'clone-creator' ? cloneCreatorStats : nonCloneUserStats;
  const gridCols = stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  
  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4 mb-8`}>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
