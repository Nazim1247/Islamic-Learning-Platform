"use client"

import { useEffect, useState } from "react"

export default function MySubmissionsPage() {
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/my-submission")
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    }
    fetchSubmissions()
  }, [])

  return (
    <div className="">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="p-2 text-left">Assignment</th>
            <th className="p-2 text-left">Submitted At</th>
            <th className="p-2 text-left">Marks</th>
            <th className="p-2 text-left">Feedback</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s._id} className="border-t">
              <td className="p-2">{s.assignmentTitle || "Untitled"}</td>
              <td className="p-2">{s.submittedAt}</td>
              <td className="p-2">{s.marks ?? "Pending"}</td>
              <td className="p-2">{s.feedback || "-"}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    s.status === "graded"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {s.status || "pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
