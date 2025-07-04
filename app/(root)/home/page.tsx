"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardCarousel } from "@/components/ImageCarousel";
import Spinner from "@/components/spinner";

interface Clone {
  _id: string;
  clone_id: string;
  clone_name: string;
  image?: string;
}

export default function Home() {
  const [clones, setClones] = useState<Clone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchClones = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col w-full min-h-screen font-poppins">
        {/* Hero Section */}
        <section className="flex flex-col gap-8 items-center w-full bg-[url('/second.svg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
          <div className="w-full h-[50vh] pt-24 relative z-10">
            <div className="flex flex-row justify-center items-center w-[90vw] mx-auto px-4">
              <div className="space-y-6 text-center md:text-left sm:w-full md:w-1/2">
                <div className="leading-tight text-black space-y-2 flex flex-col items-center">
                  <span className=" text-3xl lg:text-6xl font-bold">
                    DigiClone AI
                  </span>
                  <span className="font-semibold text-4xl text-center">
                    24/7 access to knowledge with AI-Powered Mentor
                  </span>
                </div>
                <button
                  className="bg-[#000000] text-white px-6 py-3 mb-4 lg:mb-0 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 mx-auto transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
                  onClick={() => router.push("/explore")}
                >
                  Try now <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Empower Section */}
        <section className="relative py-16 flex w-full justify-center items-center h-auto min-h-[400px]">
          <div className="absolute inset-0 bg-[url('/first.svg')] bg-cover bg-center opacity-50 z-0" />
          <span className="relative z-10 text-xl md:text-3xl font-bold mb-6 w-11/12 md:w-1/2 text-center px-4 backdrop-blur-md bg-white/40 rounded-2xl p-8 shadow-lg">
            Empower yourself with 24/7 personalized conversations. Engage,
            influence, and scale your impact effortlessly, perfect for coaches,
            influencers, CEOs, and thought leaders like you.
          </span>
        </section>

        {/* Engage Section */}
        <section className="bg-[#ffffff] py-8">
          <div className="flex justify-center w-full">
            <h2 className="text-3xl font-bold text-center mb-12 backdrop-blur-sm bg-white/30 rounded-full px-8 py-2">
              Engage with people of your intrest
            </h2>
          </div>
          <CardCarousel cards={clones} />
        </section>

        {/* Augment Section */}
        <section className="relative py-16 flex flex-col justify-center items-center">
          <div className="absolute inset-0 bg-[url('/third.svg')] bg-cover bg-center opacity-30 z-0" />
          <div className="relative z-10 px-4 max-w-6xl w-full">
            <h2 className="text-3xl font-bold text-center mb-12">
              Augment your thinking, expand your reach
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
              {[
                {
                  src: "/chat.svg",
                  text: "Ask precise and well-defined questions to receive most relevant advice.",
                },
                {
                  src: "/think.svg",
                  text: "Frame clear and specific questions to get the most relevant advice.",
                },
                {
                  src: "/hands.svg",
                  text: "Provide your feedback to help us improve the responses further.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#e1eff0] rounded-3xl py-8 px-4 flex flex-col items-center text-center w-full max-w-xs backdrop-blur-md bg-opacity-70 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-4 mb-4">
                    <Image
                      src={card.src}
                      alt="card icon"
                      width={50}
                      height={50}
                    />
                  </div>
                  <h3 className="font-medium mb-3">{card.text}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
