import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ClubEventsPage({
  params
}: {
  params: { id: string }
}) {
  const club = await prisma.club.findUnique({
    where: { ID: params.id },
    select: { Name: true }
  })

  if (!club) return notFound()

  // Get events with participant counts in a single query
  const eventsWithCounts = await prisma.$queryRaw<
    Array<{
      ID: string
      Title: string
      Date: Date
      Location: string
      participantCount: bigint
    }>
  >`
    SELECT 
      e."ID",
      e."Title",
      e."Date",
      e."Location",
      COUNT(ep."EventID") as "participantCount"
    FROM "Event" e
    LEFT JOIN "Events_Participant" ep ON e."ID" = ep."EventID"
    WHERE e."ClubID" = ${params.id}
    GROUP BY e."ID", e."Title", e."Date", e."Location"
    ORDER BY e."Date" DESC
  `

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Events by {club.Name}
          <span className="text-sm ml-2">({eventsWithCounts.length} events)</span>
        </h1>
        <Link 
          href={`/admin/clubs/${params.id}`}
          className="text-blue-600 hover:underline"
        >
          Back to Club
        </Link>
      </div>

      <div className="space-y-4">
        {eventsWithCounts.length === 0 ? (
          <p className="text-gray-500">No events found for this club</p>
        ) : (
          eventsWithCounts.map(event => (
            <div key={event.ID} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{event.Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p>{new Date(event.Date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>{event.Location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Participants</p>
                  <Link 
                    href={`/admin/events/${event.ID}/participants`}  // Changed this line
                    className="text-blue-600 hover:underline"
                  >
                    View ({Number(event.participantCount)})
                  </Link>
                </div>
                <div className="md:text-right">
                  <Link
                    href={`/admin/events/${event.ID}`}
                    className="text-blue-600 hover:underline"
                  >
                    Event Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}