import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
interface Card {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  clone_id: string;
}

export const CardCarousel = ({ cards }: { cards: Card[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedCards, setDisplayedCards] = useState<Card[]>([]);
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
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="flex items-center justify-center min-h-[400px] gap-8 p-4 w-full">
      {/* Left Card - Wider */}
      <div className="transition-all duration-500 opacity-80 scale-95 w-[20%] h-72 rounded-2xl flex flex-col" >
        <div
          className="flex-1 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${displayedCards[0]?.image || ""})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-base text-white">
              {displayedCards[0]?.subtitle || ""}
            </h3>
          </div>
        </div>
      </div>

      {/* Center Card - Largest */}
      <div className="transition-all duration-500 opacity-100 scale-110 w-[35%] h-80 rounded-3xl flex flex-col z-10"
      onClick={() => router.push(`/chat/${displayedCards[1]?.clone_id}`)}>
        <div
          className="flex-1 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${displayedCards[1]?.image || ""})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-xl text-white">
              {displayedCards[1]?.subtitle || ""}
            </h3>
          </div>
        </div>
      </div>

      {/* Right Card - Wider */}
      <div className="transition-all duration-500 opacity-80 scale-95 w-[20%] h-72 rounded-2xl flex flex-col">
        <div
          className="flex-1 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${displayedCards[2]?.image || ""})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-bold text-lg text-white">
              {displayedCards[2]?.subtitle || ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};