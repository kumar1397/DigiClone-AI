"use client"
import { ArrowLeft, Bell} from "lucide-react"
import { PenLine } from 'lucide-react';
import { useState } from 'react';
import Profile from "@/components/profile"
import UploadOptions from "@/components/upload"
import UserFiles from "@/components/display";
export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'upload':
        return <UploadOptions />;
      case 'files':
        return <UserFiles />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Settings Sidebar */}
      <div className="w-60 bg-white border-r border-[#d9d9d9] p-6">
        <div className="flex items-center gap-3 mb-8">
          <ArrowLeft className="w-5 h-5 text-[#858585]" />
          <span className="text-[#858585] text-lg">settings</span>
        </div>

        <div className="space-y-6 flex flex-col justify-center">
          <div 
            className={`flex items-center gap-3 cursor-pointer transition-colors ${
              activeSection === 'profile' ? 'text-[#1c1c1c]' : 'text-[#858585] hover:text-[#1c1c1c]'
            }`}
            onClick={() => setActiveSection('profile')}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <PenLine className="w-5 h-5" />
            </div>
            <span className={`font-medium ${activeSection === 'profile' ? 'font-semibold' : ''}`}>
              Edit profile
            </span>
          </div>

          <div 
            className={`flex items-center gap-3 cursor-pointer transition-colors ${
              activeSection === 'files' ? 'text-[#1c1c1c]' : 'text-[#858585] hover:text-[#1c1c1c]'
            }`}
            onClick={() => setActiveSection('files')}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <span>🔒</span>
            </div>
            <span>User Files</span>
          </div>

          <div 
            className={`flex items-center gap-3 cursor-pointer transition-colors ${
              activeSection === 'upload' ? 'text-[#1c1c1c]' : 'text-[#858585] hover:text-[#1c1c1c]'
            }`}
            onClick={() => setActiveSection('upload')}
          >
            <Bell className="w-5 h-5" />
            <span className={`font-medium ${activeSection === 'upload' ? 'font-semibold' : ''}`}>
              Upload Files
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#858585] cursor-pointer hover:text-[#1c1c1c] transition-colors">
            <div className="w-5 h-5 flex items-center justify-center">
              <span>❓</span>
            </div>
            <span>Help</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-7/12">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
