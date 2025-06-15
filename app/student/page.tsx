import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { joinClub } from "@/lib/actions/joinClub"
import { registerEvent } from "@/lib/actions/registerEvent"

type ClubWithManager = {
  ID: string
  Name: string
  Description: string
  Category: string
  ManagerName: string | null
}

export default async function StudentDashboard() {
  const cookieStore = cookies()
  const success = cookieStore.get("success")?.value
  const errorRaw = cookieStore.get("error")?.value

  // Sanitize error message
  let error: string | null = null
  try {
    error = errorRaw ? decodeURIComponent(errorRaw).split("\n")[0] : null
  } catch {
    error = "Something went wrong."
  }

  // Ambil data klub (join raw query)
  const clubs = await prisma.$queryRaw<ClubWithManager[]>`
    SELECT 
      c."ID", c."Name", c."Description", c."Category",
      u."name" AS "ManagerName"
    FROM "Club" c
    LEFT JOIN "User" u ON c."ManagerID" = u."id"
    WHERE c."Status" = 'approved'
  `

  // Ambil data event + klub
  const events = await prisma.event.findMany({
    include: { Club: true },
    orderBy: { Date: "asc" },
  })

  return (
    <main className="p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome, Student!</h1>

      {/* Notifikasi */}
      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 mb-6 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 mb-6 rounded whitespace-pre-wrap break-words">
          {error}
        </div>
      )}

      {/* ==== CLUBS ==== */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Available Clubs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {clubs.map((club) => (
            <div key={club.ID} className="p-4 border rounded shadow-sm">
              <h3 className="text-lg font-bold">{club.Name}</h3>
              <p className="text-sm text-gray-600 mb-1">{club.Description}</p>
              <p className="text-sm italic text-gray-500 mb-2">
                Manager: {club.ManagerName ?? "Unknown"}
              </p>
              <form action={joinClub}>
                <input type="hidden" name="clubID" value={club.ID} />
                <button className="text-blue-600 hover:underline text-sm">
                  Request to Join
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      {/* ==== EVENTS ==== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.ID} className="border p-4 rounded shadow-sm">
              <h4 className="text-lg font-bold">{event.Title}</h4>
              <p className="text-sm text-gray-600">
                Date: {new Date(event.Date).toLocaleDateString()} — Location: {event.Location}
              </p>
              <p className="text-sm text-gray-500">Organized by: {event.Club.Name}</p>
              <form action={registerEvent} className="mt-2">
                <input type="hidden" name="eventID" value={event.ID} />
                <button className="text-blue-600 hover:underline text-sm">
                  Register
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
