"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function registerEvent(formData: FormData) {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user || !user.email) throw new Error("Unauthorized")

  const eventID = formData.get("eventID") as string

  const student = await prisma.student.findFirst({
    where: { Email: user.email },
  })

  if (!student) throw new Error("Student not found")

  const existing = await prisma.events_Participant.findUnique({
    where: {
      StudentNIM_EventID: {
        StudentNIM: student.NIM,
        EventID: eventID,
      },
    },
  })

  if (existing) {
    // update jika sudah ada (opsional)
    await prisma.events_Participant.update({
      where: {
        StudentNIM_EventID: {
          StudentNIM: student.NIM,
          EventID: eventID,
        },
      },
      data: {
        Status: "registered",
        Role: "participant",
      },
    })
    return
  }

  // else, create baru
  await prisma.events_Participant.create({
    data: {
      EventID: eventID,
      StudentNIM: student.NIM,
      Status: "registered",
      Role: "participant",
    },
  })
}
