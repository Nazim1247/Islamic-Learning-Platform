"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function SubmitAssignment() {
  const { data: session } = useSession()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      assignmentTitle: title,
      submissionText: text,
      studentName: session?.user?.name,
      studentEmail: session?.user?.email,
      studentImage: session?.user?.image,
    }

    const res = await fetch("/api/submit-assignment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      toast.success("Assignment submitted successfully")
      setTitle("")
      setText("")
    } else {
      toast.error("Something went wrong")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-color rounded-2xl shadow">
      <h2 className="text-xl text-center text-orange-500 font-bold mb-4">Submit Assignment</h2>

      {/* Student Info */}
      <div className="mb-3">
        <label className="block text-sm mb-2">Name</label>
        <input type="text" value={session?.user?.name || ""} readOnly className="w-full border p-2 rounded" />
      </div>
      <div className="mb-3">
        <label className="block text-sm mb-2">Email</label>
        <input type="email" value={session?.user?.email || ""} readOnly className="w-full border p-2 rounded" />
      </div>

      {/* Assignment Title */}
      <div className="mb-3">
        <label className="block text-sm mb-2">Assignment Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter assignment title"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Assignment info */}
      <div className="mb-3">
        <label className="block text-sm mb-2">Your Assignment Information</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full border p-2 rounded h-32"
        />
      </div>

      <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full">
        Submit
      </button>
    </form>
  )
}
