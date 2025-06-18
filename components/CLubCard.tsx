"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useTransition } from "react"
import { deleteClub } from "@/lib/actions/deleteClub"

interface ClubCardProps {
  id: string
  name: string
  description: string
  category: string
  manager?: string
  members: number
  events: string
}

export function ClubCard({
  id,
  name,
  description,
  category,
  manager,
  members,
  events
}: ClubCardProps) {
  const categories = category?.split(',') ?? []
  const [isPending, startTransition] = useTransition()

  return (
    <Card className="rounded-2xl bg-blue-900 text-white shadow-md flex flex-col justify-between">
      <CardHeader className="pb-0 px-6 pt-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded" />
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-xs text-gray-200">For tech enthusiasts</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-4 text-sm text-white/90">
        <p>{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((cat, idx) => (
            <Badge
              key={idx}
              className="bg-yellow-400 text-black font-semibold text-xs"
            >
              {cat.trim()}
            </Badge>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/80 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 inline-block" />
          {members} active member{members !== 1 ? "s" : ""}
        </p>

        <p className="mt-1 text-xs text-white/80 flex items-center">
          <span className="w-2 h-2 bg-black rounded-full mr-2 inline-block" />
          {manager || "Unknown Manager"}
        </p>

        <p className="mt-2 text-xs text-white/80 flex items-center">
          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 inline-block" />
          {events}
        </p>
      </CardContent>

      <CardFooter className="bg-blue-800 text-sm justify-between px-6 py-3 flex-wrap gap-2">
        <Link
          href={`/admin/clubs/${id}/members`}
          className="text-white hover:text-yellow-300 text-xs"
        >
          View Members
        </Link>
        
        <Link
          href={`/admin/clubs/${id}/events`}
          className="text-white hover:text-yellow-300 text-xs"
        >
          View Events
        </Link>

        <div className="flex gap-2">
          <Link
            href={`/admin/clubs/${id}/edit`}
            className="text-yellow-300 hover:underline text-xs"
          >
            Edit
          </Link>

          <button
            onClick={() => startTransition(() => deleteClub(id))}
            disabled={isPending}
            className="text-white hover:text-red-400 text-xs"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}