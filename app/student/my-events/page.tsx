import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function MyEventsPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || !user.email) {
    return <p className="text-red-500">Unauthorized</p>
  }

  // 1. Cari student dari email
  const student = await prisma.student.findUnique({
    where: {
      Email: user.email,
    },
  })

  if (!student) {
    return <p className="text-red-500">Student not found</p>
  }

  // 2. Ambil event yang dia ikuti
  const events = await prisma.events_Participant.findMany({
    where: {
      StudentNIM: student.NIM,
    },
    include: {
      Event: true,
    },
  })

  // 3. Ambil jumlah event dari VIEW
  const viewResult = await prisma.$queryRaw<
    { StudentNIM: string; TotalEvents: number }[]
  >`
    SELECT * FROM EventCountPerStudent WHERE StudentNIM = ${student.NIM}
  `

  const totalEvents = viewResult[0]?.TotalEvents ?? 0

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Events</h1>
      <p className="mb-4">
        <span className="font-medium">NIM:</span> {student.NIM}<br />
        <span className="font-medium">Name:</span> {student.Name}<br />
        <span className="font-medium">Total Events Participated:</span> {totalEvents}
      </p>

      <ul className="space-y-4">
        {events.map((e) => (
          <li key={e.EventID} className="border p-4 rounded">
            <h3 className="text-lg font-bold">{e.Event.Title}</h3>
            <p className="text-sm text-gray-600">
              Date: {new Date(e.Event.Date).toLocaleDateString()} — Location: {e.Event.Location}
            </p>
            <p className="text-sm text-gray-500">Status: {e.Status}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
