// app/manager/ukms/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Use alias
import { redirect } from "next/navigation";

// Import types and components
import type { Ukm } from "@/lib/types";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import UkmCard from "@/components/ukmcard";
import Button from "@/components/ui/button1";

// --- MOCK DATA ---
// In a real app, you would fetch this from your database.
const allUkms: Ukm[] = [
  {
    id: 1, name: "Tech Innovations Club", tagline: "For tech enthusiasts", description: "Join us to explore the latest in technology.",
    tags: ["Technology", "Innovation"], imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=TIC",
    manager: { id: "user-123", name: "You", avatar: "https://placehold.co/20x20/000000/FFFFFF?text=Y" }
  },
  {
    id: 2, name: "ETX Esports", tagline: "Competitive Gaming", description: "The official esports organization, competing in various tournaments nationally.",
    tags: ["Esports", "Gaming", "Competitive"], imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=ETX",
    manager: { id: "user-456", name: "John Doe", avatar: "https://placehold.co/20x20/D8D8D8/000000?text=JD" }
  },
  {
    id: 3, name: "Photography Club", tagline: "Capture the moment", description: "A community for photographers of all skill levels to learn and share their passion.",
    tags: ["Arts", "Photography", "Creative"], imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=PC",
    manager: { id: "user-789", name: "Jane Smith", avatar: "https://placehold.co/20x20/D8D8D8/000000?text=JS" }
  },
   {
    id: 4, name: "International Student Society", tagline: "A home away from home", description: "Connecting international students and celebrating diverse cultures.",
    tags: ["Culture", "Social", "International"], imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=ISS",
    manager: { id: "user-101", name: "Lee Wei", avatar: "https://placehold.co/20x20/D8D8D8/000000?text=LW" }
  },
];
// --- END MOCK DATA ---

export default async function UkmListPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "clubManager") {
    redirect("/");
  }

  // This would come from your session object in a real app
  const currentUserId = "user-123";

  // Filter the UKMs based on the manager ID
  const managedUkms = allUkms.filter(ukm => ukm.manager.id === currentUserId);
  const otherUkms = allUkms.filter(ukm => ukm.manager.id !== currentUserId);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main>
        <Hero 
          title="List of UKMs"
          subtitle="Check out your UKM(s) and other UKMs available on campus!"
        />

        <section className="container mx-auto px-4 py-16">
          {/* Managed UKMs Section */}
          <div>
            <h2 className="text-4xl font-bold text-[#243E7E] font-friz-quadrata mb-8 text-center">
              Your Managed UKM(s)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {managedUkms.map(ukm => (
                <UkmCard key={ukm.id} ukm={ukm} currentUserId={currentUserId} />
              ))}
            </div>
          </div>

          {/* Other UKMs Section */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold text-[#243E7E] font-friz-quadrata mb-8 text-center">
              Other Available UKMs
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {otherUkms.map(ukm => (
                <UkmCard key={ukm.id} ukm={ukm} currentUserId={currentUserId} />
              ))}
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
              <Button variant='outline'>Load More...</Button>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}