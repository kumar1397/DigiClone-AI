"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Link from "next/link";
interface Clone {
  _id: string;
  clone_id: string;
  clone_name: string;
  image?: string;
  freeform_description: string;
  values: string[];
}
export default function Explore() {
  const [clones, setClones] = useState<Clone[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchClones = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/all`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          toast.error("Failed to fetch clones");
          return;
        }

        const data = await response.json();
        console.log(data.data);
        setClones(data.data);
      } catch (error) {
        console.error("Error fetching clones:", error);
        toast.error("Failed to fetch clones");
      }
    };

    fetchClones();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover AI Clones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Chat with digital clones of experts, coaches, and thought leaders.
            Get personalized advice and insights anytime, anywhere.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, expertise, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
            />
          </div>

          {/* Quick Stats */}
          {/* <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>156 Expert Clones</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>50K+ Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>4.8 Avg Rating</span>
            </div>
          </div> */}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clones.map((clone) => (
            <Card
              key={clone.clone_id}
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={clone.image} />
                    <AvatarFallback>
                      {clone.clone_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0 flex items-center">
                    <CardTitle className="text-lg font-serif truncate">
                      {clone.clone_name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {clone.freeform_description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {clone.values[0].split(",").map((value) => (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="text-xs"
                    >
                      {value}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.9</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>19.3k</span>
                    </div>
                  </div>

                  <Link href={`/chat/${clone.clone_id}`}>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-secondary text-primary-foreground"
                    >
                      Chat Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clones.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No clones found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
          <h2 className="text-2xl font-serif font-bold mb-4">
            Want to create your own clone?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join hundreds of experts who are scaling their impact and helping
            thousands of people worldwide.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8"
            >
              Create Your Clone
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
