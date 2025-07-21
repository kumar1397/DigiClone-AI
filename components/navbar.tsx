"use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ChevronDown, Settings, LogOut } from "lucide-react";
// import { useState, useEffect } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// // import { useRouter } from "next/navigation";
// export default function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check for token in localStorage
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const router = useRouter();

//   const handleLogout = async () => {

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/logout`, {
//         method: "GET", // or POST if your backend prefers
//         credentials: "include", // needed if cookie-based auth is still used
//       });

//       if (response.ok) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("userId");
//         localStorage.removeItem("token");
//         router.push("/login");
//       } else {
//         console.error("Logout failed");
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 flex w-full justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 rounded-b-2xl shadow-lg">
//       <span className="text-black text-xl lg:text-3xl font-semibold flex flex-row items-center gap-2">
//         <Image src="/logo.png" alt="logo" width={50} height={40} />
//       </span>
//       <nav className="hidden md:flex flex-row items-center gap-8 text-gray-700 text-lg font-medium pr-12 backdrop-blur-sm px-6 py-2 rounded-md ">
//         <Link
//           href="/home"
//           className="hover:text-blue-600 transition-colors duration-200"
//         >
//           Home
//         </Link>
//         <Link
//           href="/explore"
//           className="hover:text-blue-600 transition-colors duration-200"
//         >
//           Explore
//         </Link>
//         {!isAuthenticated ? (
//           <button
//             className="bg-black text-white px-4 py-1 mb-4 lg:mb-0 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 mx-auto md:mx-0 transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] shadow-[0_5px_15px_rgba(0,0,0,0.2)]" onClick={() => router.push("/login")}
//           >
//             Sign In
//           </button>
//         ) : (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <div className="w-16 rounded-full flex items-center justify-between border border-gray-300 gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
//                 <Image
//                   src="/user.jpg"
//                   alt="user"
//                   width={32}
//                   height={32}
//                   className="rounded-full"
//                 />
//                 <ChevronDown className="w-4 h-4 mr-2" />
//               </div>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-60 mt-2 mr-3">
//               <DropdownMenuLabel>
//                 <div className="flex flex-col">
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium text-xl">abcd efgh</span>
//                   </div>
//                   <span className="text-base text-muted-foreground">
//                     abcd@gmail.in
//                   </span>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => router.push("/settings")}>
//                 <Settings className="mr-2 h-4 w-4" />
//                 Settings
//               </DropdownMenuItem>
//               <DropdownMenuItem className="text-red-600 focus:bg-red-100" onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Log out
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         )}
//       </nav>
//     </header>
//   );
// }

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Brain, Menu, X, User, Settings, Crown, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock user state - in real app this would come from auth context/hook
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: null // or URL to profile picture
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add actual logout logic here
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">DigiClone AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
              Discover Clones
            </Link>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop Auth Buttons / User Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Upgrade to Premium</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-secondary text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4 pt-4">
              <Link 
                href="/explore" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover Clones
              </Link>
              <a 
                href="#how-it-works" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#pricing" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-3 px-2 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || undefined} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};


