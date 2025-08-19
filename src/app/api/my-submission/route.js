import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"
import { authOptions } from "@/lib/authOptions"

export async function GET() {
  try {
    // 1. Student Session
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const email = session.user.email

    // 3. current student's submissions find
    const submissions = await dbConnect(collectionNameObj.submissionCollection)
      .find({ studentEmail: email })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(submissions)
  } catch (err) {
    console.error("Error fetching student submissions:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
