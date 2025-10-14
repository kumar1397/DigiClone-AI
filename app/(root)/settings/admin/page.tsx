"use client"

import { useState } from "react";
import { 
  Users, Brain, Upload, BarChart3, Settings, FileText, 
  LayoutDashboard, Menu, X 
} from "lucide-react";
import AdminDashboard from "@/components/admin/dashboard";
import AdminUsers from "@/components/admin/users";
import AdminClones from "@/components/admin/clones";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "clones", label: "Clones", icon: Brain },
  
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <AdminUsers />;
      case "clones":
        return <AdminClones />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
    
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border
            transition-all duration-300 z-40
            ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
          `}
        >
          <div className="flex flex-col h-full">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden absolute top-4 right-4 p-2 hover:bg-accent rounded-md"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav className="flex-1 overflow-y-auto py-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-6 py-3 text-left transition-colors
                      ${activeTab === item.id 
                        ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }
                      ${!sidebarOpen && 'lg:justify-center lg:px-0'}
                    `}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-30 top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className={`
          flex-1 p-6 lg:p-8 transition-all duration-300
          ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
        `}>
          <button
            onClick={() => setSidebarOpen(true)}
            className={`lg:hidden mb-4 p-2 hover:bg-accent rounded-md ${sidebarOpen ? 'hidden' : ''}`}
          >
            <Menu size={24} />
          </button>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
