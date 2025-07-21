"use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// import { ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { CardCarousel } from "@/components/ImageCarousel";
// // import Spinner from "@/components/spinner";



// export default function Home() {
//   const [clones, setClones] = useState<Clone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   useEffect(() => {
//     const fetchClones = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/all`,
//           {
//             method: "GET",
//           }
//         );

//         if (!response.ok) {
//           setError("Failed to fetch clones");
//           setLoading(false);
//           return;
//         }

//         const data = await response.json();
//         console.log(data.data);
//         setClones(data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching clones:", error);
//         setError("Failed to fetch clones");
//         setLoading(false);
//       }
//     };

//     fetchClones();
//   }, []);
//   return (
//     <>
//       {/* {loading && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <Spinner />
//         </div>
//       )} */}
//       {console.log(loading)}

//       {error && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg text-center">
//             <p className="text-red-500 text-lg mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()} 
//               className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col w-full min-h-screen font-poppins">
//         {/* Hero Section */}
//         <section className="flex flex-col gap-8 items-center w-full bg-[url('/second.svg')] bg-cover bg-center relative">
//           <div className="absolute inset-0 bg-white opacity-80 z-0"></div>
//           <div className="w-full h-[50vh] pt-24 relative z-10">
//             <div className="flex flex-row justify-center items-center w-[90vw] mx-auto px-4">
//               <div className="space-y-6 text-center md:text-left sm:w-full md:w-1/2">
//                 <div className="leading-tight text-black space-y-2 flex flex-col items-center">
//                   <span className=" text-3xl lg:text-6xl font-bold">
//                     DigiClone AI
//                   </span>
//                   <span className="font-semibold text-4xl text-center">
//                     24/7 access to knowledge with AI-Powered Mentor
//                   </span>
//                 </div>
//                 <button
//                   className="bg-[#000000] text-white px-6 py-3 mb-4 lg:mb-0 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 mx-auto transform hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
//                   onClick={() => router.push("/explore")}
//                 >
//                   Try now <ArrowRight className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Empower Section */}
//         <section className="relative py-16 flex w-full justify-center items-center h-auto min-h-[400px]">
//           <div className="absolute inset-0 bg-[url('/first.svg')] bg-cover bg-center opacity-50 z-0" />
//           <span className="relative z-10 text-xl md:text-3xl font-bold mb-6 w-11/12 md:w-1/2 text-center px-4 backdrop-blur-md bg-white/40 rounded-2xl p-8 shadow-lg">
//             Empower yourself with 24/7 personalized conversations. Engage,
//             influence, and scale your impact effortlessly, perfect for coaches,
//             influencers, CEOs, and thought leaders like you.
//           </span>
//         </section>

//         {/* Engage Section */}
//         <section className="bg-[#ffffff] py-8">
//           <div className="flex justify-center w-full">
//             <h2 className="text-3xl font-bold text-center mb-12 backdrop-blur-sm bg-white/30 rounded-full px-8 py-2">
//               Engage with people of your intrest
//             </h2>
//           </div>
//           <CardCarousel cards={clones} />
//         </section>

//         {/* Augment Section */}
//         <section className="relative py-16 flex flex-col justify-center items-center">
//           <div className="absolute inset-0 bg-[url('/third.svg')] bg-cover bg-center opacity-30 z-0" />
//           <div className="relative z-10 px-4 max-w-6xl w-full">
//             <h2 className="text-3xl font-bold text-center mb-12">
//               Augment your thinking, expand your reach
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
//               {[
//                 {
//                   src: "/chat.svg",
//                   text: "Ask precise and well-defined questions to receive most relevant advice.",
//                 },
//                 {
//                   src: "/think.svg",
//                   text: "Frame clear and specific questions to get the most relevant advice.",
//                 },
//                 {
//                   src: "/hands.svg",
//                   text: "Provide your feedback to help us improve the responses further.",
//                 },
//               ].map((card, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-[#e1eff0] rounded-3xl py-8 px-4 flex flex-col items-center text-center w-full max-w-xs backdrop-blur-md bg-opacity-70 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <div className="p-4 mb-4">
//                     <Image
//                       src={card.src}
//                       alt="card icon"
//                       width={50}
//                       height={50}
//                     />
//                   </div>
//                   <h3 className="font-medium mb-3">{card.text}</h3>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
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
const Index = () => {
 
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link href="/signup">
              <Button size="lg" className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8 py-4 text-lg animate-pulse-glow">
                Create Your Clone
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/discover">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                Explore Clones
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 animate-float">
            <Image 
              src="/people-laptop.jpeg" 
              alt="Person using DigiClone AI" 
              className="mx-auto rounded-2xl shadow-2xl max-w-2xl w-full"
              width={1000}
              height = {1000}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-background">
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
      <section className="py-20 px-4 bg-muted/30">
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
                    className={`cursor-pointer transition-all duration-300 ${
                      activeUseCase === index 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setActiveUseCase(index)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${useCase.color}`} />
                        <CardTitle className="text-lg font-serif">{useCase.title}</CardTitle>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${
                          activeUseCase === index ? 'rotate-90' : ''
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