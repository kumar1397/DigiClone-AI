
import { auth } from "@/app/auth";
import ExploreClient from "./explore-client";
import Navbar from "@/components/navbar";
export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
       <Navbar session={session}/>
      
      <div className="text-center mb-12">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover AI Clones
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Chat with digital clones of experts, coaches, and thought leaders.
            Get personalized advice and insights anytime, anywhere.
          </p>
          <ExploreClient  />
        </div>
      </div>
    </div>
  );
}
