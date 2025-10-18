import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, RefreshCw, Trash2, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Clone {
  name: string;
  creator: string;
  status: string;
  createdOn: string;
  conversations: number;
  feedback: string;
  description: string;
  personality: string;
  sources: number;
}

const AdminClones = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClone, setSelectedClone] = useState<Clone | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const clones = [
    {
      name: "Coach Riya",
      creator: "riya@example.com",
      status: "live",
      createdOn: "11 Sep 2025",
      conversations: 1240,
      feedback: "91%",
      description: "Personal fitness and wellness coach",
      personality: "Empathetic, Motivational",
      sources: 5
    },
    {
      name: "Dr. Sharma",
      creator: "rahul@example.com",
      status: "live",
      createdOn: "05 Sep 2025",
      conversations: 980,
      feedback: "94%",
      description: "Medical advice and health consultation",
      personality: "Professional, Caring",
      sources: 8
    },
    {
      name: "Business Mentor",
      creator: "anita@example.com",
      status: "training",
      createdOn: "10 Oct 2025",
      conversations: 0,
      feedback: "N/A",
      description: "Business strategy and entrepreneurship guidance",
      personality: "Confident, Strategic",
      sources: 3
    },
    {
      name: "Tech Guide",
      creator: "priya@example.com",
      status: "error",
      createdOn: "09 Oct 2025",
      conversations: 0,
      feedback: "N/A",
      description: "Technology and programming mentor",
      personality: "Friendly, Technical",
      sources: 2
    },
  ];

  const filteredClones = clones.filter(clone =>
    clone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clone.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">🟢 Live</Badge>;
      case "training":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">🟡 Training</Badge>;
      case "error":
        return <Badge variant="destructive">🔴 Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewClone = (clone: Clone) => {
    setSelectedClone(clone);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Clone Management</h1>
        <p className="text-muted-foreground mt-1">Monitor, retrain, and manage all clones</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search clones by name or creator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clones Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Clones ({filteredClones.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Clone Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Creator</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created On</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Conversations</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Feedback</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClones.map((clone, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50">
                    <td className="py-3 px-4 font-medium">{clone.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{clone.creator}</td>
                    <td className="py-3 px-4">{getStatusBadge(clone.status)}</td>
                    <td className="py-3 px-4 text-muted-foreground">{clone.createdOn}</td>
                    <td className="py-3 px-4">{clone.conversations}</td>
                    <td className="py-3 px-4">{clone.feedback}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewClone(clone)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Clone Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Clone Details</DialogTitle>
            <DialogDescription>View and manage clone information</DialogDescription>
          </DialogHeader>
          {selectedClone && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Clone Name</p>
                  <p className="font-medium">{selectedClone.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Creator</p>
                  <p className="font-medium">{selectedClone.creator}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedClone.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedClone.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Sources</p>
                  <p className="font-medium">{selectedClone.sources} sources</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Personality Settings</p>
                <p className="font-medium">{selectedClone.personality}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Conversations</p>
                  <p className="font-medium">{selectedClone.conversations}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Feedback Score</p>
                  <p className="font-medium">{selectedClone.feedback}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created On</p>
                <p className="font-medium">{selectedClone.createdOn}</p>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
            <Button variant="secondary">
              <MessageCircle size={16} className="mr-2" />
              Test Chat
            </Button>
            <Button>
              <RefreshCw size={16} className="mr-2" />
              Retrain Clone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminClones;
