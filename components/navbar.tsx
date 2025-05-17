import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex w-full justify-between items-center px-6 py-4 backdrop-blur-md bg-white/30 rounded-b-2xl shadow-lg">
      <span className="text-black text-xl lg:text-3xl font-semibold flex flex-row items-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={40} /> DigiClone AI
      </span>
      <nav className="hidden md:flex gap-8 text-gray-700 text-lg font-medium pr-12 backdrop-blur-sm bg-white/20 rounded-full px-6 py-2">
        <Link
          href="/home"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/explore"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Explore
        </Link>
      </nav>
    </header>
  );
}
