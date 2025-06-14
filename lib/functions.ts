// lib/functions.ts
import { prisma } from "@/lib/prisma";

export async function getClubMemberCount(clubId: string): Promise<number> {
  return prisma.students_Club_Member.count({
    where: {
      ClubID: clubId,
      Status: true,
    },
  });
}
