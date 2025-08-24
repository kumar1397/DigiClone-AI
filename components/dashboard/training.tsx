import {
    Play,
    Brain,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Training({ cloneData }: { cloneData: { Status: string } }) {
    return (
        <>
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
                            <span className="text-sm text-muted-foreground">33% complete</span>
                        </div>
                        <Progress value={33} className="h-3" />
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

                    {cloneData.Status === 'publish' && (
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
        </>
    );
}