"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Bot, MessageCircle, Star, Users, Brain, Heart, Dumbbell, Briefcase, BookOpen, Quote, ChevronRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
const Index = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const createUser = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: session.user?.name ?? "",
            email: session.user?.email ?? "",
            image: session.user?.image ?? "",
          }),
        });
      };
      createUser();
    }
  }, [session]);
  
  const [activeUseCase, setActiveUseCase] = useState(0);

  const useCases = [
    {
      title: "Coaching & Mentoring",
      description: "Scale your coaching impact. Let your clone provide personalized guidance 24/7.",
      icon: Heart,
      color: "text-red-500"
    },
    {
      title: "Leadership & Business",
      description: "Share your leadership wisdom and business insights with unlimited reach.",
      icon: Briefcase,
      color: "text-blue-500"
    },
    {
      title: "Fitness & Wellness",
      description: "Help others achieve their health goals with your proven methodologies.",
      icon: Dumbbell,
      color: "text-green-500"
    },
    {
      title: "Knowledge Sharing",
      description: "Transform your expertise into an interactive learning experience.",
      icon: BookOpen,
      color: "text-purple-500"
    },
    {
      title: "Personal Legacy",
      description: "Preserve your wisdom and values for future generations.",
      icon: Brain,
      color: "text-amber-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Life Coach",
      content: "My digital clone has helped over 1,000 people while I sleep. It's like having multiple versions of myself mentoring around the clock.",
      rating: 5
    },
    {
      name: "Dr. Michael Kumar",
      role: "Business Consultant",
      content: "The clone captures my consulting approach perfectly. My clients get instant insights, and I can focus on high-level strategy.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Fitness Expert",
      content: "People love chatting with my clone for workout advice and motivation. It's transformed how I scale my fitness coaching.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
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
      <section className="py-20 px-4 bg-muted/30" id="endless-possibility">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Endless Possibilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create clones for any domain where your expertise can help others
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 ${activeUseCase === index
                        ? 'border-primary shadow-lg scale-105'
                        : 'hover:shadow-md'
                      }`}
                    onClick={() => setActiveUseCase(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${useCase.color}`} />
                        <CardTitle className="text-lg font-serif">{useCase.title}</CardTitle>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${activeUseCase === index ? 'rotate-90' : ''
                          }`} />
                      </div>
                    </CardHeader>
                    {activeUseCase === index && (
                      <CardContent className="pt-0 animate-fade-in">
                        <CardDescription className="text-base">
                          {useCase.description}
                        </CardDescription>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="relative">
              <Image
                src="/working-laptop.jpeg"
                width={1000}
                height={1000}
                alt="AI Technology Visualization"
                className="rounded-2xl shadow-xl w-full animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What Creators Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of experts who&apos;ve transformed their impact with DigiClone AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Quote className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-serif">{testimonial.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm font-medium text-primary">
                    {testimonial.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    &quot;{testimonial.content}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input
              placeholder="Enter your email to get started"
              className="max-w-sm"
            />
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

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

export default Index;