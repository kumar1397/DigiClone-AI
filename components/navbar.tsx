"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { useRouter } from "next/navigation";
export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const router = useRouter();

  const handleLogout = async () => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/logout`, {
        method: "GET", // or POST if your backend prefers
        credentials: "include", // needed if cookie-based auth is still used
      });

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex w-full justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 rounded-b-2xl shadow-lg">
      <span className="text-black text-xl lg:text-3xl font-semibold flex flex-row items-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={40} />
      </span>
      <nav className="hidden md:flex flex-row items-center gap-8 text-gray-700 text-lg font-medium pr-12 backdrop-blur-sm px-6 py-2 rounded-md ">
        <Link
          href="/home"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/explore"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Explore
        </Link>
        {!isAuthenticated ? (
          <button
            className="bg-black text-white px-4 py-1 mb-4 lg:mb-0 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 mx-auto md:mx-0 transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] shadow-[0_5px_15px_rgba(0,0,0,0.2)]" onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-16 rounded-full flex items-center justify-between border border-gray-300 gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                <Image
                  src="/user.jpg"
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <ChevronDown className="w-4 h-4 mr-2" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 mt-2 mr-3">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xl">abcd efgh</span>
                  </div>
                  <span className="text-base text-muted-foreground">
                    abcd@gmail.in
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:bg-red-100" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
