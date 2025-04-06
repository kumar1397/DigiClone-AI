"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full min-h-screen font-poppins">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 items-center w-full bg-[url('/first.svg')] bg-cover bg-center">
        <header className="flex w-full justify-between items-center px-6 py-4">
          <span className=" text-black text-3xl font-semibold">
            <Image src="/logo.png" alt="logo" width={20} height={20} />
            DigiClone AI
          </span>
          <nav className="flex gap-8 text-gray-700 text-lg font-medium pr-12">
            <Link
              href="/"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/chat"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Explore
            </Link>
          </nav>
        </header>

        <div className="flex flex-row justify-between w-full mt-3">
          <div className="space-y-6 pl-24">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              Meet your AI-Powered
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
              Mentor
            </h1>
            <button className="bg-[#000000] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity"
            onClick={() => router.push('/chat')}>
              Try now <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/teacher.svg"
              alt="AI Mentor Illustration"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </section>
      {/* Empower Section */}
      <section className="relative py-16 flex w-full justify-center items-center h-96">
        <div className="absolute inset-0 bg-[url('/second.svg')] bg-cover bg-center opacity-30 z-0" />
        <span className="relative z-10 text-2xl md:text-3xl font-bold mb-6 w-1/2 text-center">
          Empower yourself with 24/7 personalized conversations. Engage,
          influence, and scale your impact effortlessly, perfect for coaches,
          influencers, CEOs, and thought leaders like you.
        </span>
      </section>

      {/* Engage Section */}
      <section className="bg-[#f6f6f6] py-8">
        <h2 className="text-3xl font-bold text-center mb-12 ">
          Engage with people of your intrest
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#ff7a59] text-white rounded-3xl overflow-hidden">
            <div className="pl-8 pr-8 pt-8 h-68 flex flex-col md:flex-row items-center gap-6">
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-bold">
                  Learn the Power of AI
                </h3>
                <p className="text-lg">with Suman Acharya</p>
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity" 
                onClick={() => router.push('/chat')}>
                  Talk with Suman
                </button>
              </div>
              <div className="md:ml-auto pt-14">
                <Image
                  src="/reading.svg"
                  alt="Suman Acharya"
                  width={300}
                  height={300}
                  className="object-cover "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Augment Section */}
      <section className="relative h-[567px] flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-[url('/third.svg')] bg-cover bg-center opacity-30 z-0" />

        <div className="relative z-10 px-4 max-w-6xl w-full">
          <h2 className="text-3xl font-bold text-center mb-12">
            Augment your thinking, expand your reach
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#e1eff0] rounded-3xl p-8 flex flex-col items-center text-center w-56">
              <div className="p-4 mb-4">
                <Image src="chat.svg" alt="chat" width={40} height={40} />
              </div>
              <h3 className="font-medium mb-3">
                Ask precise and well defined questions to receive the most
                relevant advice.
              </h3>
            </div>

            <div className="bg-[#e1eff0] rounded-3xl p-8 flex flex-col items-center text-center w-56">
              <div className=" p-4 mb-4">
                <Image src="think.svg" alt="think" width={50} height={50} />
              </div>
              <h3 className="font-medium mb-3">
                Frame clear and specific questions to get the most relevant
                advice.
              </h3>
            </div>

            <div className="bg-[#e1eff0] rounded-3xl p-8 flex flex-col items-center text-center w-56">
              <div className=" p-4 mb-4">
                <Image src="hands.svg" alt="hands" width={50} height={50} />
              </div>
              <h3 className="font-medium mb-3">
                Provide your feedback to help us improve the responses further.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#282828] text-white mt-auto">
        <div className="container mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-2xl font-bold">DigiClone AI</h2>
            <p className="text-sm mt-2 text-gray-300">
              Empower your expertise, automate your impact.
            </p>
          </div>
          <div className="w-full bg-white h-[0.99px]"></div>
          <div className="flex flex-row justify-between items-start gap-8 h-8 mt-8">
            <div className="flex flex-row gap-8 justify-center items-center">
              <span className="text-lg font-medium">Connect with Us</span>
              <div className="flex gap-4">
                <Link href="#" className="hover:opacity-80">
                  <FaInstagram />
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <FaLinkedinIn />
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <FaDiscord />
                </Link>
                <Link href="#" className="hover:opacity-80">
                  <FaXTwitter />
                </Link>
              </div>
            </div>

            <div className="flex gap-8 text-sm mt-8">
              <Link href="/privacy-policy" className="hover:opacity-80">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:opacity-80">
                Terms and Conditions
              </Link>
              <Link href="/code-of-conduct" className="hover:opacity-80">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
