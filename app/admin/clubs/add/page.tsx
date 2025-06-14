import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default function AddClubPage() {
  async function createClub(formData: FormData) {
    'use server';
    const name = formData.get('Name') as string;
    const category = formData.get('Category') as string;
    const description = formData.get('Description') as string;

await prisma.club.create({
  data: {
    Name: name,
    Category: category,
    Description: description,
  } as any, // quick fix
});


    redirect('/admin/clubs');
  }

  return (
    <main className="min-h-screen bg-white text-blue-900">
      {/* Navbar */}
      <nav className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-4">
          <li><a href="/admin">Home</a></li>
          <li><a href="/admin/clubs">Clubs</a></li>
          <li><a href="/admin/events">Events</a></li>
        </ul>
      </nav>

      <section className="px-8 py-10 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Club</h2>
        <form action={createClub} className="bg-blue-900 p-6 rounded shadow-md text-white space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Club Name</label>
            <input
              type="text"
              name="Name"
              required
              className="w-full px-3 py-2 text-white rounded border border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <input
              type="text"
              name="Category"
              required
              className="w-full px-3 py-2 text-white rounded border border-blue-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="Description"
              required
              className="w-full px-3 py-2 text-white rounded border border-blue-300"
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500"
            >
              Save Club
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
