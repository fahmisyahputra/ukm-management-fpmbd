'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function joinClub(formData: FormData) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || user.role !== "student") {
    throw new Error("Unauthorized")
  }

  const clubID = formData.get("clubID") as string

  // ✅ Gunakan findFirst agar aman
  const student = await prisma.student.findFirst({
    where: {
      Email: user.email!,
    },
  })

  if (!student) throw new Error("Student not found")

  const existing = await prisma.students_Club_Member.findUnique({
    where: {
      StudentNIM_ClubID: {
        StudentNIM: student.NIM,
        ClubID: clubID,
      },
    },
  })

if (existing) {
  await prisma.students_Club_Member.update({
    where: {
      StudentNIM_ClubID: {
        StudentNIM: student.NIM,
        ClubID: clubID,
      },
    },
    data: {
      Status: true,
      JoinDate: new Date(), // update waktu juga boleh
    },
  })
  return;
}

  await prisma.students_Club_Member.create({
    data: {
      StudentNIM: student.NIM,
      ClubID: clubID,
      JoinDate: new Date(),
      Role: 0,
      Status: true,
    },
  })
}
