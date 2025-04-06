import {
  Home,
  Settings,
  ArrowRight,
  Download,
  CircleArrowLeft ,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-32 bg-[#fed9c5] flex flex-col items-center justify-between py-5">
        <div className="flex flex-col gap-4">
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <CircleArrowLeft  className="w-6 h-6 text-[#0e0000]" />
          </button>
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Home className="w-6 h-6 text-[#0e0000]" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Download className="w-6 h-6 text-[#0e0000]" />
          </button>
          <button className="p-4 hover:bg-[#f9f9f9]/10 rounded-full transition-colors">
            <Settings className="w-6 h-6 text-[#0e0000]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f9f9f9]">
        {/* Header */}
        <div className="bg-[#fed9c5] px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#d9d9d9] flex items-center justify-center">
              {/* Avatar placeholder */}
            </div>
            <span className="text-lg font-medium text-[#0e0000]">
              Suman Acharya
            </span>
          </div>
          <div className="w-64 relative">
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              className="bg-white border-none rounded-full h-10 pl-10"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-medium text-[#0e0000]">Welcome,</h1>
          <h2 className="text-2xl font-medium text-[#0e0000] mt-2">
            What would you like to know?
          </h2>
        </div>

        {/* Footer Input */}
        <div className="p-8">
          <div className="max-w-2xl mx-auto relative">
            <Input
              className="bg-[#f7f7f7] border-none rounded-full h-14 pl-8 pr-14 text-[#0e0000]/50"
              placeholder="Type your Questions here"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent">
              <ArrowRight className="w-5 h-5 text-[#0e0000]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
