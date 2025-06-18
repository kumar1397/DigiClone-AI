// pages/home.tsx
"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardCarousel } from "@/components/ImageCarousel";
import engageCardsData from "@/app/data/engage-cards.json";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

interface Props {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export default function Home({ user }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full min-h-screen font-poppins">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 items-center w-full bg-[url('/first.svg')] bg-cover bg-center">
        <div className="pt-24 w-full">
          <div className="flex flex-row justify-between items-center w-[90vw] mx-auto px-4">
            <div className="space-y-6 text-center md:text-left sm:w-full md:w-1/2">
              <div className="text-3xl lg:text-5xl font-bold leading-tight text-black space-y-2">
                <h1>Meet your AI-Powered</h1>
                <h1>Mentor</h1>
              </div>
              <button
                className="bg-[#000000] text-white px-6 py-3 mb-4 lg:mb-0 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 mx-auto md:mx-0 transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
                onClick={() => router.push("/chat")}
              >
                Try now <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="hidden md:flex justify-end mt-8 md:mt-0 w-1/2">
              <Image
                src="/teacher.svg"
                alt="AI Mentor Illustration"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Empower Section */}
      <section className="relative py-16 flex w-full justify-center items-center h-auto min-h-[400px]">
        <div className="absolute inset-0 bg-[url('/second.svg')] bg-cover bg-center opacity-30 z-0" />
        <span className="relative z-10 text-xl md:text-3xl font-bold mb-6 w-11/12 md:w-1/2 text-center px-4 backdrop-blur-md bg-white/40 rounded-2xl p-8 shadow-lg">
          Empower yourself with 24/7 personalized conversations. Engage,
          influence, and scale your impact effortlessly, perfect for coaches,
          influencers, CEOs, and thought leaders like you.
        </span>
      </section>

      {/* Engage Section */}
      <section className="bg-[#f6f6f6] py-8">
        <div className="flex justify-center w-full">
          <h2 className="text-3xl font-bold text-center mb-12 backdrop-blur-sm bg-white/30 rounded-full px-8 py-2">
            Engage with people of your interest
          </h2>
        </div>
        <CardCarousel cards={engageCardsData.cards} />
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
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie;

  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { token } = cookie.parse(cookies);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return {
      props: {
        user: decoded,
      },
    };
  } catch (err) {
    console.error("JWT verification failed:", err);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
