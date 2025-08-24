"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
interface Clone {
  _id: string;
  clone_id: string;
  clone_name: string;
  image?: string;
  freeform_description: string;
  values: string[];
}

export default function ExploreClient({ clones }: { clones: Clone[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cloneId, setCloneId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCloneId(user.cloneId);
      } catch {
        toast.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const filteredClones = clones.filter((clone) =>
    clone.clone_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}

      <div className="text-center mb-12">

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
      </div>
      {/* Clone Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClones.map((clone) => (
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
                height={100}
              />
              <div className="absolute bottom-0 left-0 w-full h-1/5 opacity-50" />
            </div>

            {/* Overlay content */}
            <div className="absolute bottom-0 left-0 z-10 w-full h-1/5 p-4 text-white flex flex-col justify-end">
              <div className="flex items-center justify-between text-xs">
                <CardTitle className="text-lg font-serif truncate">
                  {clone.clone_name}
                </CardTitle>
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

      {/* CTA Section */}
      {!cloneId && (
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
              className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground font-semibold px-8"
            >
              Create Your Clone
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
