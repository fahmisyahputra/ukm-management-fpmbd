// app/admin/events/add/page.tsx
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

async function addEvent(formData: FormData) {
  "use server"

  const title = formData.get("title") as string
  const location = formData.get("location") as string
  const date = formData.get("date") as string
  const clubId = formData.get("clubId") as string

  await prisma.event.create({
    data: {
      Title: title,
      Location: location,
      Date: new Date(date),
      ClubID: clubId,
    },
  })

  redirect("/admin/events")
}

export default async function AddEventPage() {
  const clubs = await prisma.club.findMany()

  return (
    <main className="max-w-xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Add New Event</h1>
      <form action={addEvent} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Event Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Club</label>
          <select name="clubId" required className="w-full border rounded px-3 py-2">
            {clubs.map((club) => (
              <option key={club.ID} value={club.ID}>
                {club.Name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
