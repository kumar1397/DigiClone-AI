// app/explore/page.tsx
import Navbar from "@/components/navbar";
import { getAllClones } from "@/lib/db";
import ExploreClient from "./explore-client";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const clones = await getAllClones();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="text-center mb-12">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover AI Clones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Chat with digital clones of experts, coaches, and thought leaders.
            Get personalized advice and insights anytime, anywhere.
          </p>
          <ExploreClient clones={clones} />
        </div>
      </div>
    </div>
  );
}
