// app/manager/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Import types and components
import type { Ukm, Applicant } from "@/lib/types";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import UkmCard from "@/components/ukmcard";
import WaitingListCard from "@/components/waitinglistcard"; // Assuming you have this component from before

// --- MOCK DATA for this page ---
// This list should only contain the UKMs that this specific manager oversees.
const managedUkms: Ukm[] = [
  {
    id: 1,
    name: "Tech Innovations Club",
    tagline: "For tech enthusiasts",
    description: "Join us to explore the latest in technology.",
    tags: ["Technology", "Innovation"],
    imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=TIC",
    // This manager's ID matches the simulated currentUserId below
    manager: { id: "user-123", name: "You", avatar: "https://placehold.co/20x20/000000/FFFFFF?text=Y" }
  },
  // As Head of Admin for ETX, you might manage this one too.
  {
    id: 2, name: "ETX Esports Administration", tagline: "The backbone of champions.", description: "Overseeing all administrative, design, and international team needs for ETX.",
    tags: ["Esports", "Administration", "Design"], imageUrl: "https://placehold.co/100x100/1B4A89/FFFFFF?text=ETX",
    manager: { id: "user-123", name: "You", avatar: "https://placehold.co/20x20/000000/FFFFFF?text=Y" }
  }
];

const waitingList: Applicant[] = [
    { id: 1, name: "Ariq Javier Ramadhani R.", year: "First Year", imageUrl: "https://placehold.co/250x240/D8D8D8/000000?text=AJR" },
    { id: 2, name: "Muhammad Fahmi Syahputra", year: "First Year", imageUrl: "https://placehold.co/250x240/D8D8D8/000000?text=MFS" },
    { id: 3, name: "Mu’aafii Putra Ramadhan", year: "Third Year", imageUrl: "https://placehold.co/250x240/D8D8D8/000000?text=MPR" },
];
// --- END MOCK DATA ---


export default async function ManagerPage() {
  const session = await getServerSession(authOptions);
  
  // In a real app, the user ID would come from the session object.
  // For example: session.user.id
  if (!session || session.user?.role !== "clubManager") {
    redirect("/");
  }

  // Simulate getting the current user's ID from the session
  const currentUserId = "user-123";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main>
        {/* We can re-use the Hero component here too! */}
        <Hero
            title="Welcome Back, Manager"
            subtitle="Manage your UKMs, view waiting lists, and connect with your members."
        />

        {/* Section 2: Your UKMs */}
        <section className="py-16">
          <div className="container mx-auto flex flex-col items-center gap-10 px-4">
            <h2 className="text-4xl font-bold text-[#1B4A89] font-friz-quadrata">
              Your UKMs
            </h2>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
              {/* --- THIS IS THE UPDATED PART --- */}
              {managedUkms.map(ukm => (
                <UkmCard 
                  key={ukm.id} 
                  ukm={ukm} 
                  currentUserId={currentUserId} // Pass the user ID now
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Waiting List */}
        <section className="bg-[#1B4A89] py-16 text-white">
            <div className="container mx-auto px-4">
                 <h2 className="text-4xl font-bold font-friz-quadrata text-center">
                  Recent Waiting List Applicants
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {waitingList.map(applicant => (
                    <WaitingListCard key={applicant.id} applicant={applicant} />
                ))}
                </div>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}