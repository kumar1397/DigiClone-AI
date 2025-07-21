"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation checks
    if (password !== confirmPassword) {
      toast.error("Password mismatch. Please make sure your passwords match.");
      return;
    }

    if (password.length < 8) {
      toast.error(
        "Password too short. Password must be at least 8 characters long."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully! ");
        router.push("/login");
      } else {
        const errorMessage =
          data.error || data.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFileUpload = (type: string) => {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = type === 'selfie' ? 'image/*' : 'image/*,.pdf';
  //   input.onchange = (e) => {
  //     const file = (e.target as HTMLInputElement).files?.[0];
  //     if (file) {
  //       setUploadedFiles(prev => [...prev, `${type}: ${file.name}`]);
  //       toast.success(`${type === 'selfie' ? 'Selfie' : 'ID Document'} uploaded successfully.`);
  //     }
  //   };
  //   input.click();
  // };

  // const handleVerificationComplete = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     toast.success("Verification complete! Welcome to DigiClone AI. Redirecting to dashboard...");
  //     // In real app, redirect to dashboard
  //     setIsLoading(false);
  //   }, 2000);
  // };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-serif font-bold mb-2">
            Create your account
          </h1>
          <p className="text-muted-foreground">
            Start building your digital clone today
          </p>
        </div>

        {/* Step 1: Account Creation */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-serif">
              Sign up for DigiClone AI
            </CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-secondary text-primary-foreground font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-2 text-sm text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full h-11">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Identity Verification */}
        {/* {step === 2 && (
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Required</Badge>
              </div>
              <CardTitle className="text-xl font-serif">Identity Verification</CardTitle>
              <CardDescription>
                Upload your documents for identity validation. This ensures trust and safety for all users.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Why we need this
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Verify your identity for clone authenticity</li>
                  <li>• Protect against impersonation</li>
                  <li>• Build trust in the DigiClone community</li>
                  <li>• Your data is encrypted and secure</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Step 1: Upload a clear selfie</Label>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 h-12 border-dashed"
                    onClick={() => handleFileUpload('selfie')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Selfie
                  </Button>
                </div>

                <div>
                  <Label className="text-base font-semibold">Step 2: Upload government ID</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Aadhaar Card, PAN Card, Passport, or Driver&apos;s License
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-dashed"
                    onClick={() => handleFileUpload('id')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload ID Document
                  </Button>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Uploaded files:</Label>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-success">
                      <CheckCircle className="h-4 w-4" />
                      {file}
                    </div>
                  ))}
                </div>
              )}

              <Button 
                className="w-full h-11 bg-primary hover:bg-secondary text-primary-foreground font-semibold"
                disabled={uploadedFiles.length < 2 || isLoading}
                onClick={handleVerificationComplete}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  "Complete Verification"
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your documents are used only for identity validation and are not made public. 
                We comply with all data protection regulations.
              </p>
            </CardContent>
          </Card>
        )} */}

        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
