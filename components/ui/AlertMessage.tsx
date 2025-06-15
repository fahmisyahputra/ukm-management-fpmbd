"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function AlertMessage() {
  const searchParams = useSearchParams()
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const s = searchParams.get("success")
    const e = searchParams.get("error")

    if (s) setSuccess(s)
    if (e) setError(e)

    // Auto clear from URL after 3s
    if (s || e) {
      setTimeout(() => {
        const url = new URL(window.location.href)
        url.search = ""
        window.history.replaceState({}, "", url.toString())
      }, 3000)
    }
  }, [searchParams])

  return (
    <>
      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
    </>
  )
}
