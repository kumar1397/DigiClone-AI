import Link from "next/link"
import { useState } from "react";

export default function AccountCreation() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect or show success message
        console.log('Signup successful:', data);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4 md:p-8">
      {/* Logo */}

      {/* Main content */}
      <div className="w-full max-w-md mt-16 flex flex-col items-center">
        <h1 className="text-[#333333] text-3xl font-medium mb-2">Create an account</h1>
        <p className="text-[#666666] mb-12">
          Already have an account?{" "}
          <Link href="/login" className="text-[#333333] underline">
            Log in now
          </Link>
        </p>

        {/* Progress steps */}
        <div className="w-full flex justify-between mb-8">
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#333333] text-white flex items-center justify-center mb-2">1</div>
            <p className="text-sm text-[#333333]">Enter your email address</p>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-[1px] w-full bg-[#eeeeee]"></div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#c4c4c4] text-white flex items-center justify-center mb-2">2</div>
            <p className="text-sm text-[#666666]">Provide your basic info</p>
          </div>
          <div className="flex-1 flex items-center">
            <div className="h-[1px] w-full bg-[#eeeeee]"></div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-8 h-8 rounded-full bg-[#c4c4c4] text-white flex items-center justify-center mb-2">3</div>
            <p className="text-sm text-[#666666]">Create your password</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#333333] mb-2">
                What&apos;s your email?
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-4 border border-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[#333333] mb-2">
                Your name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-4 border border-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-[#333333] mb-2">
                Create a password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-4 border border-[#eeeeee] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333333]"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#c4c4c4] text-white py-4 rounded-lg mt-4 hover:bg-opacity-90 transition-all"
            >
              Next
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-[1px] bg-[#eeeeee]"></div>
            <span className="px-4 text-[#666666]">OR</span>
            <div className="flex-1 h-[1px] bg-[#eeeeee]"></div>
          </div>

          {/* Social login */}
          <div className="flex flex-col space-y-4 mt-4">
            <button className="w-full border border-[#eeeeee] rounded-full py-3 px-4 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-all">
              <GoogleIcon />
              <span className="text-[#333333]">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  )
}
