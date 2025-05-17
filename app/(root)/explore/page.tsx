"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import engageCardsData from "@/app/data/engage-cards.json";
export default function ExplorePage() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="mt-24">
      <div className="relative w-[90vw] mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {engageCardsData.cards.map((card) => (
              <div key={card.id} className=" flex flex-[0_0_100%] min-w-0 rounded-3xl items-center justify-center">
                <div className="relative w-[85vw] min-h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <div className="w-full h-full" />
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-opacity-30 flex flex-col justify-between p-8">
                    <div className="space-y-2">
                      <h3 className="text-3xl md:text-4xl font-bold text-white">
                        {card.title}
                      </h3>
                      <p className="text-xl text-white">with {card.subtitle}</p>
                    </div>

                    <div className="w-full md:w-auto">
                      <button
                        className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 text-lg"
                        onClick={() => router.push("/chat")}
                      >
                        {card.buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={scrollPrev}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
              className="bg-white overflow-hidden duration-300 rounded-xl group"
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
