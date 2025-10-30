import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Bot, MessageCircle, Star, Users, } from "lucide-react";

import Footer from "@/components/footer";
import Image from "next/image"
import Link from "next/link";
import InitUser from "./User";
import UseCases from "./useCases";

export default async function HomePage() {
  const session = await auth();

  const safeSession = session
    ? {
      ...session,
      user: {
        ...session.user,
        cloneId: session.user.cloneId ?? null,
      },
    }
    : null;

  return (
    <div className="min-h-screen bg-background">
      <InitUser session={safeSession} />
      <section className="hero-gradient py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            ✨ AI-Powered Digital Clones
          </Badge>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-foreground animate-fade-in">
            Build Your Digital Self.
            <br />
            <span className="text-primary">Let Your Knowledge Live On.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            Create an AI-powered clone that thinks, speaks, and helps like you.
            Scale your impact, preserve your wisdom, and mentor others 24/7.
          </p>

          <Link href="/explore">
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg w-96">
              Explore Clones
            </Button>
          </Link>


          <div className="mt-12 animate-float">
            <Image
              src="/people-laptop.jpeg"
              alt="Person using DigiClone AI"
              className="mx-auto rounded-2xl shadow-2xl max-w-2xl w-full"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-background" id="how-it-works">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your knowledge into an intelligent digital clone in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">1. Upload Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Share your expertise through documents, videos, or direct input.
                  Our AI learns your unique style and knowledge.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">2. Train Your Clone</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Our advanced AI processes your content and creates a personalized
                  clone that captures your personality and expertise.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">3. Share & Impact</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base">
                  Launch your clone to help others. Monitor conversations,
                  gather insights, and scale your impact infinitely.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <UseCases />

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Build Your Digital Legacy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of knowledge sharing. Create your AI clone today and start
            helping people around the world with your unique expertise.
          </p>

          {!session && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        
              <Link href="/auth">
                <Button size="lg" className="bg-primary hover:bg-[#3c3b3b] text-primary-foreground font-semibold px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10,000+ Creators</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>1M+ Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

