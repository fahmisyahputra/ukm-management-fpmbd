// app/admin/events/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type EventWithParticipants = {
  ID: string;
  Title: string;
  Date: string;
  Location: string;
  ClubName: string;
  ManagerName: string | null;
  ManagerEmail: string | null;
  participantCount: number;
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    select: {
      ID: true,
      Title: true,
      Date: true,
      Location: true,
      Club: {
        select: {
          Name: true,
          User: {
            select: {
              name: true,
              email: true
            }
          }
        }
      },
      _count: {
        select: {
          Events_Participant: true
        }
      }
    }
  });

  const formattedEvents = events.map(event => ({
    ID: event.ID,
    Title: event.Title,
    Date: event.Date.toISOString(),
    Location: event.Location,
    ClubName: event.Club.Name,
    ManagerName: event.Club.User?.name || null,
    ManagerEmail: event.Club.User?.email || null,
    participantCount: event._count.Events_Participant
  }));

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Events Management</h1>
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Club</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Manager</th>
            <th className="p-2 text-left">Manager Email</th>
            <th className="p-2 text-left">Participants</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {formattedEvents.map((event) => (
            <tr key={event.ID} className="border-t hover:bg-gray-100">
              <td className="p-2">{event.Title}</td>
              <td className="p-2">{event.ClubName}</td>
              <td className="p-2">{new Date(event.Date).toLocaleDateString()}</td>
              <td className="p-2">{event.Location}</td>
              <td className="p-2">{event.ManagerName ?? "-"}</td>
              <td className="p-2">{event.ManagerEmail ?? "-"}</td>
              <td className="p-2">{event.participantCount}</td>
              <td className="p-2">
                <Link 
                  href={`/admin/events/${event.ID}/participants`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Participants
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}