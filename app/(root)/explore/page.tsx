// app/explore/page.tsx
import Navbar from "@/components/navbar";
import { getAllClones } from "@/lib/db";
import ExploreClient from "./explore-client";

export const dynamic = "force-dynamic"; // ensures fresh fetch if needed

export default async function ExplorePage() {
  const clones = await getAllClones(); // server-side fetch

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <ExploreClient clones={clones} />
      </div>
    </div>
  );
}
