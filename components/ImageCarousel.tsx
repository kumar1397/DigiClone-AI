import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Card {
  _id: string;
  clone_id: string;
  clone_name: string;
  image?: string;
}

export const CardCarousel = ({ cards }: { cards: Card[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  
  // Update displayed cards whenever currentIndex changes
  useEffect(() => {
    const getCard = (offset: number) =>
      cards[(currentIndex + offset + cards.length) % cards.length];

    setDisplayedCards([
      getCard(-1), // Left
      getCard(0),  // Center
      getCard(1)   // Right
    ]);
  }, [currentIndex, cards]);

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="flex items-center justify-center min-h-[400px] gap-8 p-4 w-full">
      {/* Left Card - Wider */}
      <div className={`transition-all duration-700 ease-in-out opacity-80 scale-95 w-[20%] h-72 rounded-2xl  flex-col transform hidden md:flex ${
        isTransitioning ? 'translate-x-2 opacity-60' : 'translate-x-0 opacity-80'
      }`}>
        <div
          className="flex-1 bg-cover bg-center relative transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: `url(${displayedCards[0]?.image || ""})`,
            transition: 'background-image 0.7s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-700">
            <h3 className="font-semibold text-base text-white transition-all duration-700">
              {displayedCards[0]?.clone_name || ""}
            </h3>
          </div>
        </div>
      </div>

      {/* Center Card - Largest */}
      <div className={`transition-all duration-700 ease-in-out opacity-100 scale-110 w-full md:w-[35%] h-80 rounded-3xl flex flex-col z-10 transform cursor-pointer hover:scale-105 ${
        isTransitioning ? 'scale-105 opacity-90' : 'scale-110 opacity-100'
      }`}
      onClick={() => router.push(`/chat/${displayedCards[1]?.clone_id}`)}>
        <div
          className="flex-1 bg-cover bg-center relative transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: `url(${displayedCards[1]?.image || ""})`,
            transition: 'background-image 0.7s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-700">
            <h3 className="font-bold text-xl text-white transition-all duration-700">
              {displayedCards[1]?.clone_name || ""}
            </h3>
          </div>
        </div>
      </div>

      {/* Right Card - Wider */}
      <div className={`transition-all duration-700 ease-in-out opacity-80 scale-95 w-[20%] h-72 rounded-2xl  flex-col transform hidden md:flex ${
        isTransitioning ? '-translate-x-2 opacity-60' : 'translate-x-0 opacity-80'
      }`}>
        <div
          className="flex-1 bg-cover bg-center relative transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: `url(${displayedCards[2]?.image || ""})`,
            transition: 'background-image 0.7s ease-in-out'
          }}
        >
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-700"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-700">
            <h3 className="font-bold text-lg text-white transition-all duration-700">
              {displayedCards[2]?.clone_name || ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};