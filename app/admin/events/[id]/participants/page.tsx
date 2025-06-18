// app/admin/events/[id]/participants/page.tsx
import { prisma } from "@/lib/prisma";

export default async function EventParticipantsPage({
  params,
}: {
  params: { id: string };
}) {
  const event = await prisma.event.findUnique({
    where: { ID: params.id },
    include: {
      Events_Participant: {
        include: {
          Student: true,
        },
      },
      Club: true,
    },
  });

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Participants for {event.Title}
      </h1>
      <h2 className="text-xl mb-6">Club: {event.Club.Name}</h2>
      
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">NIM</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Faculty</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {event.Events_Participant.map((participant) => (
            <tr key={participant.StudentNIM} className="border-t hover:bg-gray-100">
              <td className="p-2">{participant.StudentNIM}</td>
              <td className="p-2">{participant.Student.Name}</td>
              <td className="p-2">{participant.Student.Faculty}</td>
              <td className="p-2">{participant.Status}</td>
              <td className="p-2">{participant.Role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}