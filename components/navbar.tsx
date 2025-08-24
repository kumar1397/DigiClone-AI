"use client";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brain,
  Menu,
  X,
  User,
  Settings,
  Crown,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = session?.user?.name ?? "";
  const image = session?.user?.image ?? "";
  const email = session?.user?.email ?? "";

  const userData = useRef({
    name,
    email,
    image,
    userId: "",
    cloneId: "",
  });
  const pathname = usePathname();
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const fetchCloneInfo = async () => {
      if (!email) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const user = await res.json();
        if (user.cloneId) {
          userData.current.cloneId = user.cloneId;
        } else {
          console.warn("⚠️ No cloneId found for user");
        }

        if (user._id) {
          userData.current.userId = user._id;
        }

        localStorage.setItem("user", JSON.stringify(userData.current));
      } catch (err) {
        console.error("❌ Error fetching clone info:", err);
      }
    };

    fetchCloneInfo();
  }, [email]);

  const handleLogOut = () => {
    localStorage.clear();
    signOut();
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
            <span className="text-xl font-serif font-bold text-foreground">
              DigiClone AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {pathname !== "/home" && (

              <Link href="/home" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            )}
            <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
              Discover Clones
            </Link>

            {pathname === "/home" && (
              <>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
                <a href="#endless-possibility" className="text-muted-foreground hover:text-primary transition-colors">
                  Endless possibilities
                </a>
              </>
            )}
          </nav>

          {/* Auth Buttons or Avatar */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={image} alt={name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Upgrade to Premium</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                    Login
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-primary hover:bg-secondary text-primary-foreground">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
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
              {pathname !== "/home" && (
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              )}
              <Link href="/explore" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-primary">
                Discover Clones
              </Link>
              {pathname === "/home" && (
                <>
                  <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-primary">
                    How It Works
                  </a>
                  <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-primary">
                    Pricing
                  </a>
                </>
              )}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                {session ? (
                  <>
                    <div className="flex items-center gap-3 px-2 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={image} alt={name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getUserInitials(name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-xs text-muted-foreground">{email}</span>
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
                        setIsMenuOpen(false);
                        handleLogOut();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
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
}
