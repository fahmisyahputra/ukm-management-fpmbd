'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteClub(id: string) {
  await prisma.club.delete({ where: { ID: id } })
  revalidatePath('/admin/clubs') // agar list ter-update otomatis
}
