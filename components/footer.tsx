import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#282828] text-white mt-auto backdrop-blur-md bg-opacity-90 hidden md:block">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold">DigiClone AI</h2>
          <p className="text-sm mt-2 text-gray-300">
            Empower your expertise, automate your impact.
          </p>
        </div>
        <div className="w-full bg-white h-[1px]"></div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <span className="text-lg font-medium">Connect with Us</span>
            <div className="flex gap-4">
              <Link href="#">
                <FaInstagram />
              </Link>
              <Link href="#">
                <FaLinkedinIn />
              </Link>
              <Link href="#">
                <FaDiscord />
              </Link>
              <Link href="#">
                <FaXTwitter />
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 text-sm mt-4 md:mt-0">
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
  );
}

