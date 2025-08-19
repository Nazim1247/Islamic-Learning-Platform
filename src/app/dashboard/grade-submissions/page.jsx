"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function GradeSubmissionPage() {
  const [submissions, setSubmissions] = useState([])

  // Submissions fetch
  useEffect(() => {
    const fetchSubmissions = async () => {
      const res = await fetch("/api/submit-assignment")
      const data = await res.json()
      setSubmissions(data)
    }
    fetchSubmissions()
  }, [])

  // Update function
  const handleUpdate = async (id, marks, feedback) => {
    const res = await fetch(`/api/submit-assignment/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ marks, feedback }),
    })

    if (res.ok) {
      toast.success("Marks updated")
    } else {
      toast.error("Error updating")
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="p-2 text-left">Student</th>
            <th className="p-2 text-left">Assignment</th>
            <th className="p-2 text-left">Marks</th>
            <th className="p-2 text-left">Feedback</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map((s) => (
            <SubmissionRow key={s._id} submission={s} onUpdate={handleUpdate} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SubmissionRow({ submission, onUpdate }) {
  const [marks, setMarks] = useState(submission.marks || "")
  const [feedback, setFeedback] = useState(submission.feedback || "")

  return (
    <tr className="border-t">
      <td className="p-2">{submission.studentName}</td>
      <td className="p-2">{submission.submissionText}</td>
      <td className="p-2">
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          className="border p-1 w-16"
        />
      </td>
      <td className="p-2">
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="border p-1 w-full"
        />
      </td>
      <td className="p-2 text-center">
        <button
          onClick={() => onUpdate(submission._id, marks, feedback)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </td>
    </tr>
  )
}
