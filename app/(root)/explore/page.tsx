"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Spinner from "@/components/spinner";
import { UsersRound, Clock  } from 'lucide-react';
interface Clone {
  _id: string;
  clone_id: string;
  clone_name: string;
  image?: string;
}

export default function ExplorePage() {
  const router = useRouter();
  const [clones, setClones] = useState<Clone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClones = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Please log in again");
          } else {
            setError("Failed to fetch clones");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log(data.data);
        setClones(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clones:", error);
        setError("Failed to fetch clones");
        setLoading(false);
      }
    };

    fetchClones();
  }, []);

  return (
    <>
    {loading && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <Spinner />
      </div>
    )}
    <div>
     <div style={{ width: '100%', position: 'relative', height: '500px' }}>
      <Image src="/bg1 1.svg" alt="bgimg" fill style={{ objectFit: 'cover' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 drop-shadow-lg">
          Explore Your Digital World
        </h1>
        <p className="text-xl md:text-2xl text-black/90 max-w-2xl px-4 drop-shadow-md">
          Discover, learn, and interact with AI-powered insights
        </p>
      </div>
     </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <span className="block text-2xl font-semibold mb-8">
          Explore All Clones
        </span>
        
       

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && clones.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clones.map((clone) => (
              <div
                key={clone._id}
                className="relative bg-white overflow-hidden duration-300 rounded-xl group cursor-pointer shadow-lg hover:shadow-xl transition-all w-80 h-80"
                onClick={() => router.push(`/chat/${clone.clone_id}`)}
              >
                {/* Image container - full height */}
                <div className="relative h-full w-full">
                  {clone.image ? (
                    <Image
                      src={clone.image}
                      alt={clone.clone_name}
                      fill
                      className="object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* Card content - overlay with glassy effect */}
                <div className="absolute bottom-0 left-0 right-0 py-4 px-4 backdrop-blur-md bg-white/20 border-t border-white/30">
                  <p className="text-white font-semibold text-2xl drop-shadow-lg text-center">
                    {clone.clone_name}
                  </p>
                  <div className="flex items-center justify-between w-full mt-3">
                    <div className="flex items-center gap-2">
                      <UsersRound className="w-5 h-5 text-white" />
                      <span className="text-white text-base drop-shadow-md">24</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-white" />
                      <span className="text-white text-base drop-shadow-md">58 min</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
