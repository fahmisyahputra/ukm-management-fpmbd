// app/admin/event-logs/page.tsx
import { prisma } from "@/lib/prisma"

export default async function EventLogsPage() {
  const logs = await prisma.$queryRaw<
    { id: string; eventID: string; action: string; timestamp: string }[]
  >`SELECT * FROM EventLog ORDER BY timestamp DESC`

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Event Logs</h1>

      <table className="w-full table-auto border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Event ID</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Timestamp</th>
          </tr>
        </thead>
<tbody>
  {logs.map((log) => (
    <tr key={log.id}>
      <td className="p-2 border">{log.id}</td>
      <td className="p-2 border">{log.eventID}</td>
      <td className="p-2 border">{log.action}</td>
      <td className="p-2 border">
        {new Date(log.timestamp).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </main>
  )
}
