import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.club.delete({
    where: { ID: params.id },
  });

  return NextResponse.redirect(new URL('/admin/clubs', req.url));
}
