// app/admin/events/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type EventWithView = {
  ID: string;
  Title: string;
  Date: string;
  Location: string;
  ClubName: string;
  ManagerName: string | null;
  ManagerEmail: string | null;
};

// Fahmi-Query VIEW untuk melihat daftar Event, Club, Date, Location, Manager, Email
export default async function EventsPage() {
  const events = await prisma.$queryRaw<EventWithView[]>`
    SELECT 
      e."ID", 
      e."Title", 
      e."Date", 
      e."Location", 
      v."ClubName", 
      v."ManagerName", 
      v."ManagerEmail"
    FROM "Event" e
    JOIN "ClubWithManagerView" v ON e."ClubID" = v."ClubID"
  `;

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event List View</h1>
        <div className="space-x-2">
          <Link href="/admin/events/add">
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
              + Add Event
            </button>
          </Link>
          <Link href="/admin/event-logs">
            <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              📝 View Logs
            </button>
          </Link>
        </div>
      </div>

      <table className="w-full table-auto border-collapse text-sm shadow">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="p-2 border">Event</th>
            <th className="p-2 border">Club</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Manager</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.ID} className="border-t hover:bg-gray-100">
              <td className="p-2">{e.Title}</td>
              <td className="p-2">{e.ClubName}</td>
              <td className="p-2">{new Date(e.Date).toLocaleDateString()}</td>
              <td className="p-2">{e.Location}</td>
              <td className="p-2">{e.ManagerName ?? "-"}</td>
              <td className="p-2">{e.ManagerEmail ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
