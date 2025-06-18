import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ClubMembersPage({
  params
}: {
  params: { id: string }
}) {
  const club = await prisma.club.findUnique({
    where: { ID: params.id },
    select: { Name: true }
  })

  if (!club) return notFound()

  const members = await prisma.$queryRaw<
    Array<{
      student_name: string
      join_date: Date
      role: number
    }>
  >`
    SELECT 
      s."Name" as student_name,
      scm."JoinDate" as join_date,
      scm."Role" as role
    FROM "Student" s
    JOIN "Students_Club_Member" scm ON s."NIM" = scm."StudentNIM"
    WHERE scm."ClubID" = ${params.id} AND scm."Status" = TRUE
    ORDER BY scm."Role", scm."JoinDate"
  `

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Members of {club.Name}
          <span className="text-sm ml-2">({members.length} members)</span>
        </h1>
        <Link 
          href={`/admin/clubs/${params.id}`}
          className="text-blue-600 hover:underline"
        >
          Back to Club
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {member.student_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(member.join_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getRoleName(member.role)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function getRoleName(role: number): string {
  switch(role) {
    case 1: return "President"
    case 2: return "Vice President"
    case 3: return "Secretary"
    default: return "Member"
  }
}