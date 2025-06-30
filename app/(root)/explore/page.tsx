"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface Clone {
  _id: string;
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
        
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

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

        {!loading && !error && clones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No clones found. Create your first clone!</p>
            <button 
              onClick={() => router.push('/clone')} 
              className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Create Clone
            </button>
          </div>
        )}

        {!loading && !error && clones.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clones.map((clone) => (
              <div
                key={clone._id}
                className="bg-white overflow-hidden duration-300 rounded-xl group cursor-pointer shadow-lg hover:shadow-xl transition-all"
                onClick={() => router.push(`/chat/${clone._id}`)}
              >
                {/* Image container */}
                <div className="relative h-48 w-full">
                  {clone.image ? (
                    <Image
                      src={clone.image}
                      alt={clone.clone_name}
                      fill
                      className="object-cover rounded-t-xl transition-opacity duration-300 group-hover:opacity-80"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-xl">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* Card content - only name */}
                <div className="py-4 flex flex-col h-full">
                  <p className="text-black font-semibold text-base mb-4">
                    {clone.clone_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
