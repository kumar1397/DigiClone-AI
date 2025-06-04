"use client";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Store token if needed
        localStorage.setItem('token', data.token);
        router.push('/home');
      } else {
        setIsInvalid(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsInvalid(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <main className="w-full max-w-md flex-1 py-8">
        <h1 className="text-2xl font-semibold text-center mb-8">Log in</h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[#333333]">
              Email address or user name
            </label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsInvalid(false);
              }}
              className={`w-full h-12 rounded-md border ${
                isInvalid ? "border-red-500" : "border-[#c4c4c4]"
              }`}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-[#333333]">
                Password
              </label>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-[#666666] flex items-center text-sm hover:text-[#333333] transition-colors"
              >
                {showPassword ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Show
                  </>
                )}
              </button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsInvalid(false);
              }}
              className={`w-full h-12 rounded-md border ${
                isInvalid ? "border-red-500" : "border-[#c4c4c4]"
              }`}
            />
          </div>

          {isInvalid && (
            <p className="text-red-500 text-sm">Invalid email or password</p>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="rounded-sm data-[state=checked]:bg-[#333333] border-[#333333]"
            />
            <label htmlFor="remember" className="text-sm text-[#333333]">
              Remember me
            </label>
          </div>

          <div className="text-sm text-center text-[#333333]">
            By continuing, you agree to the{" "}
            <Link href="#" className="underline">
              Terms of use
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy.
            </Link>
          </div>

          <Button 
            type="submit"
            className={`w-full h-12 rounded-full transition-all duration-200 ${
              isFormFilled 
                ? "bg-[#333333] text-white hover:bg-[#444444]" 
                : "bg-[#c4c4c4] text-[#333333] hover:bg-[#b4b4b4]"
            }`}
          >
            Log in
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="#" className="text-sm text-[#333333] underline">
            Forget your password
          </Link>
        </div>

        <div className="mt-6 text-center text-[#333333]">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium underline">
            Sign up
          </Link>
        </div>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#c4c4c4]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#333333]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <button className="w-full border-2 border-[#eeeeee] rounded-full py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all">
            <GoogleIcon />
            <span className="text-[#333333]">Sign up with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}
function GoogleIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
        fill="#4285F4"
      />
      <path
        d="M12 23C14.97 23 17.46 22.015 19.28 20.335L15.725 17.575C14.74 18.235 13.48 18.625 12 18.625C9.13504 18.625 6.71004 16.69 5.84504 14.09H2.17004V16.94C3.98004 20.535 7.70004 23 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84501 14.09C5.62501 13.43 5.50001 12.725 5.50001 12C5.50001 11.275 5.62501 10.57 5.84501 9.91V7.06H2.17001C1.40001 8.59 0.950012 10.28 0.950012 12C0.950012 13.72 1.40001 15.41 2.17001 16.94L5.84501 14.09Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.375C13.615 5.375 15.065 5.93 16.205 7.02L19.36 3.865C17.455 2.09 14.965 1 12 1C7.70004 1 3.98004 3.465 2.17004 7.06L5.84504 9.91C6.71004 7.31 9.13504 5.375 12 5.375Z"
        fill="#EA4335"
      />
    </svg>
  );
}
