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
  Settings,
  Crown,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import { useUserStore } from "@/lib/useUserStore";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
  cloneId: string | null;
}

interface Session {
  user: SessionUser;
}

export default function Navbar({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { name, email, image, clearUser } = useUserStore();

  const getUserInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleLogout = async () => {
    clearUser(); // wipe zustand state
    await signOut({ callbackUrl: "/" });
  }


  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">
              MentorZap AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {pathname !== "/home" && (
              <Link
                href="/home"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              href="/explore"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Discover Clones
            </Link>

            {pathname === "/home" && (
              <>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#endless-possibility"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Endless possibilities
                </a>
              </>
            )}
          </nav>

          {/* Auth Buttons or Avatar */}
          <div className="hidden md:flex items-center gap-4">
            {session  ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={image}
                        alt={name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {email}
                      </p>
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
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary"
                  >
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
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
