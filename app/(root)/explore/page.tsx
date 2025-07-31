"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import LoaderGrid from "@/components/loaderGrid";
import Link from "next/link";
import Image from "next/image";
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
  const [isLoading, setIsLoading] = useState(true);
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
        setClones(data.data);
        setIsLoading(false);
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

        {isLoading ? (
          <LoaderGrid />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clones.map((clone) => (
              <Card
                key={clone.clone_id}
                className="relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 shadow-md border-0 h-[300px]"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={clone.image ?? "/default-clone.png"}
                    alt={clone.clone_name}
                    className="w-full h-full object-cover"
                    width={100}
                    height = {100}
                  />
                  {/* Semi-transparent black backdrop on bottom half */}
                  <div className="absolute bottom-0 left-0 w-full h-2/5 bg-black opacity-50" />
                </div>

                {/* Overlay content displayed on the bottom-half overlay */}
                <div className="absolute bottom-0 left-0 z-10 w-full h-1/3 p-4 text-white flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold text-lg border border-white">
                      {clone.clone_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <CardTitle className="text-lg font-serif truncate">
                      {clone.clone_name}
                    </CardTitle>
                  </div>

                  <p className="text-sm line-clamp-2 mb-2">
                    {clone.freeform_description}
                  </p>


                  <div className="flex items-center justify-between text-xs"> 
                    <div className="flex flex-wrap gap-2 ">
                      {clone.values[0].split(",").map((value) => (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="text-xs bg-white/10 text-white border border-white/30"
                        >
                          {value}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/chat/${clone.clone_id}`}>
                      <Button
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        Chat Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>


            ))}
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
          <Link href="/create-clone">
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