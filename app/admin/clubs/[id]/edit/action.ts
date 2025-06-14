'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function updateClub(id: string, formData: FormData) {
  const name = formData.get('Name') as string;
  const category = formData.get('Category') as string;
  const description = formData.get('Description') as string;

  await prisma.club.update({
    where: { ID: id },
    data: {
      Name: name,
      Category: category,
      Description: description,
    },
  });

  redirect('/admin/clubs');
}
