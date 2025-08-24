// app/_components/use-cases.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Briefcase, Dumbbell, BookOpen, Brain, ChevronRight } from "lucide-react";
import Image from "next/image";

const useCases = [
  {
    title: "Coaching & Mentoring",
    description: "Scale your coaching impact. Let your clone provide personalized guidance 24/7.",
    icon: Heart,
    color: "text-red-500",
  },
  {
    title: "Leadership & Business",
    description: "Share your leadership wisdom and business insights with unlimited reach.",
    icon: Briefcase,
    color: "text-blue-500",
  },
  {
    title: "Fitness & Wellness",
    description: "Help others achieve their health goals with your proven methodologies.",
    icon: Dumbbell,
    color: "text-green-500",
  },
  {
    title: "Knowledge Sharing",
    description: "Transform your expertise into an interactive learning experience.",
    icon: BookOpen,
    color: "text-purple-500",
  },
  {
    title: "Personal Legacy",
    description: "Preserve your wisdom and values for future generations.",
    icon: Brain,
    color: "text-amber-500",
  },
];

export default function UseCases() {
  const [activeUseCase, setActiveUseCase] = useState(0);

  return (
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
                  onClick={() => setActiveUseCase(index)}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeUseCase === index
                      ? "border-primary shadow-lg scale-105"
                      : "hover:shadow-md"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${useCase.color}`} />
                      <CardTitle className="text-lg font-serif">{useCase.title}</CardTitle>
                      <ChevronRight
                        className={`h-4 w-4 ml-auto transition-transform ${
                          activeUseCase === index ? "rotate-90" : ""
                        }`}
                      />
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
  );
}
