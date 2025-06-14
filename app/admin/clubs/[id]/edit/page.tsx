import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function EditClubPage({ params }: Props) {
  const { id } = params;
  const club = await prisma.club.findUnique({ where: { ID: id } });

  if (!club) return notFound();

  async function updateClub(formData: FormData) {
    'use server';
    const name = formData.get('Name') as string;
    const category = formData.get('Category') as string;
    const description = formData.get('Description') as string;

    await prisma.club.update({
      where: { ID: id },
      data: { Name: name, Category: category, Description: description },
    });

    redirect('/admin/clubs');
  }

  return (
    <div className="p-8 text-blue-900 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Edit Club</h1>
      <form action={updateClub}>
        <label className="block mb-2">
          <span className="font-semibold">Name</span>
          <input
            type="text"
            name="Name"
            defaultValue={club.Name}
            className="block border border-blue-300 px-3 py-2 rounded w-full mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="font-semibold">Category</span>
          <input
            type="text"
            name="Category"
            defaultValue={club.Category}
            className="block border border-blue-300 px-3 py-2 rounded w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="font-semibold">Description</span>
          <textarea
            name="Description"
            defaultValue={club.Description}
            className="block border border-blue-300 px-3 py-2 rounded w-full mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
