import { PrismaClient } from '@prisma/client';
import data from './dummy-data.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding data...');

  // Hapus data lama
  await prisma.events_Participant.deleteMany();
  await prisma.students_Club_Member.deleteMany();
  await prisma.event.deleteMany();
  await prisma.club.deleteMany();
  await prisma.student.deleteMany();

  // Tambahkan data Student dan Club langsung
  await prisma.student.createMany({ data: data.students });
  await prisma.club.createMany({ data: data.clubs });

  // ====== EVENTS ======
  const eventsWithDate = data.events.map((event) => ({
    ...event,
    Date: new Date(event.Date),
  }));
  await prisma.event.createMany({ data: eventsWithDate });

  // ====== CLUB MEMBERS (remove duplicates + parse date) ======
  const clubMembersWithDate = data.club_members.map((member) => ({
    ...member,
    JoinDate: new Date(member.JoinDate),
  }));

  const uniqueClubMembersMap = new Map();
  const uniqueClubMembers = [];

  for (const member of clubMembersWithDate) {
    const key = `${member.StudentNIM}-${member.ClubID}`;
    if (!uniqueClubMembersMap.has(key)) {
      uniqueClubMembersMap.set(key, true);
      uniqueClubMembers.push(member);
    }
  }

  await prisma.students_Club_Member.createMany({ data: uniqueClubMembers });

  // ====== EVENT PARTICIPANTS (remove duplicates) ======
  const uniqueEventParticipantsMap = new Map();
  const uniqueEventParticipants = [];

  for (const ep of data.event_participants) {
    const key = `${ep.StudentNIM}-${ep.EventID}`;
    if (!uniqueEventParticipantsMap.has(key)) {
      uniqueEventParticipantsMap.set(key, true);
      uniqueEventParticipants.push(ep);
    }
  }

  await prisma.events_Participant.createMany({ data: uniqueEventParticipants });

  console.log('✅ Seeding complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
