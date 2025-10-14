import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Brain, MessageCircle, ThumbsUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
  const metrics = [
    { label: "Total Users", value: "250", icon: Users, change: "+12%" },
    { label: "Active Clones", value: "68", icon: Brain, change: "+8%" },
    { label: "Conversations Today", value: "1,324", icon: MessageCircle, change: "+23%" },
    { label: "Avg. Feedback Score", value: "92%", icon: ThumbsUp, change: "+5%" },
  ];

  const conversationData = [
    { day: "Mon", conversations: 850 },
    { day: "Tue", conversations: 1020 },
    { day: "Wed", conversations: 980 },
    { day: "Thu", conversations: 1150 },
    { day: "Fri", conversations: 1324 },
    { day: "Sat", conversations: 890 },
    { day: "Sun", conversations: 760 },
  ];

  const topClones = [
    { name: "Coach Riya", engagement: 1240 },
    { name: "Dr. Sharma", engagement: 980 },
    { name: "Fitness Pro", engagement: 850 },
    { name: "Business Mentor", engagement: 720 },
    { name: "Tech Guide", engagement: 640 },
  ];

  const recentClones = [
    { name: "Yoga Master", creator: "priya@example.com", date: "2025-10-11" },
    { name: "Career Coach", creator: "rahul@example.com", date: "2025-10-10" },
    { name: "Study Buddy", creator: "anita@example.com", date: "2025-10-09" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and key metrics</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    <p className="text-xs text-green-600 mt-1">{metric.change}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversations Over Time (7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={conversationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 Clones by Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topClones}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="engagement" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clone Creations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Clone Creations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Clone Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Creator</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created On</th>
                </tr>
              </thead>
              <tbody>
                {recentClones.map((clone, index) => (
                  <tr key={index} className="border-b hover:bg-accent/50">
                    <td className="py-3 px-4">{clone.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{clone.creator}</td>
                    <td className="py-3 px-4 text-muted-foreground">{clone.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
