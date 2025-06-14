import { prisma } from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { ClubCard } from "@/components/CLubCard"
import { getClubMemberCount } from "@/lib/functions"

interface ClubWithManager {
  ID: string
  Name: string
  Description: string
  Category: string
  ManagerName: string | null
  memberCount: number
}

// Fahmi-Query JOIN untuk mendapatkan data klub dengan nama manajer dan menampilkan semua klub pada halaman admin
export default async function ClubsPage() {
  const rawClubs = await prisma.$queryRaw<
    Omit<ClubWithManager, 'memberCount'>[]
  >`
    SELECT c."ID", c."Name", c."Description", c."Category", u."name" AS "ManagerName"
    FROM "club" c
    LEFT JOIN "user" u ON c."ManagerID" = u."id"
  `;

  // Fahmi-Query FUNCTION Tambahkan member count dari helper dan menampilkan di halaman admin jumlah anggota aktif nya
  const clubs: ClubWithManager[] = await Promise.all(
    rawClubs.map(async (club) => ({
      ...club,
      memberCount: await getClubMemberCount(club.ID),
    }))
  );

  return (
    <main className="bg-white text-blue-900 min-h-screen pb-20">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="ITS Logo" width={80} height={80} />
        </div>
        <ul className="flex space-x-6 text-md font-medium">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/admin/clubs" className="hover:underline">Clubs</Link></li>
          <li><Link href="/admin/events" className="hover:underline">Events</Link></li>
          <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          <li><Link href="/login" className="hover:underline">Login</Link></li>
        </ul>
      </nav>

      {/* Header */}
      <header className="bg-blue-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">List of available UKMs</h1>
        <p className="text-sm text-gray-200">
          Here are the UKMs that ITS currently have!
        </p>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        {/* Add New Club Button */}
        <div className="text-right mt-10 mb-6">
          <Link
            href="/admin/clubs/add"
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            + Add New Club
          </Link>
        </div>

        {/* Club Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clubs.map((club) => (
            <ClubCard
              key={club.ID}
              id={club.ID}
              name={club.Name}
              description={club.Description}
              category={club.Category}
              manager={club.ManagerName || "Unassigned"}
              members={club.memberCount} // ← Tambahkan ini ke komponen
            />
          ))}
        </div>
      </div>
    </main>
  );
}
