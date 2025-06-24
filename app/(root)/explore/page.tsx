"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import engageCardsData from "@/app/data/engage-cards.json";

export default function ExplorePage() {
  const router = useRouter();
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
          Explore All Topics
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engageCardsData.cards.map((card) => (
            <div
              key={card.id}
              className="bg-white overflow-hidden duration-300 rounded-xl group cursor-pointer"
              onClick={() => router.push(`/chat/${card.clone_id}`)}
            >
              {/* Image container with name overlay */}
              <div className="relative h-48 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover rounded-xl transition-opacity duration-300 group-hover:opacity-80"
                />
              </div>

              {/* Card content */}
              <div className="py-4 flex flex-col h-full">
                <p className="text-black font-semibold text-base mb-4">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
