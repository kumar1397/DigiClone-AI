import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, UserX, Trash2, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);

  const users = [
    { 
      name: "Riya Mehta", 
      email: "riya@example.com", 
      role: "Creator", 
      verified: true, 
      cloneCount: 1, 
      joinedOn: "10 Sep 2025",
      status: "active"
    },
    { 
      name: "Rahul Sharma", 
      email: "rahul@example.com", 
      role: "Creator", 
      verified: true, 
      cloneCount: 2, 
      joinedOn: "05 Sep 2025",
      status: "active"
    },
    { 
      name: "Priya Patel", 
      email: "priya@example.com", 
      role: "Creator", 
      verified: false, 
      cloneCount: 0, 
      joinedOn: "11 Oct 2025",
      status: "pending"
    },
    { 
      name: "Anita Singh", 
      email: "anita@example.com", 
      role: "Creator", 
      verified: true, 
      cloneCount: 1, 
      joinedOn: "08 Oct 2025",
      status: "active"
    },
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all registered users</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Users</Button>
              <Button variant="outline">Verified</Button>
              <Button variant="outline">Pending</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Verification</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Clones</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {user.verified ? (
                        <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                          <CheckCircle size={14} className="mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircle size={14} className="mr-1" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">{user.cloneCount}</td>
                    <td className="py-3 px-4 text-muted-foreground">{user.joinedOn}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <UserX size={16} />
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

      {/* User Details Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View and manage user information</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <Badge variant="secondary">{selectedUser.role}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clones Created</p>
                <p className="font-medium">{selectedUser.cloneCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Joined On</p>
                <p className="font-medium">{selectedUser.joinedOn}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Close</Button>
            <Button variant="destructive">Suspend Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
