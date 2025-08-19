import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"

export async function POST(req) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
   
    const submission = {
      assignmentTitle: body.assignmentTitle,  
      submissionText: body.submissionText,
      studentName: session.user.name,
      studentEmail: session.user.email,
      studentImage: session.user.image,
      submittedAt: new Date(),
      status: "submitted",
      marks: 'Pending',
      feedback: "Good explanation, try to elaborate more."
    }

    const res = await dbConnect(collectionNameObj.submissionCollection).insertOne(submission)

    return NextResponse.json({ success: true, id: res.insertedId })
  } catch (err) {
    console.error("Error saving submission:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissionCollection = dbConnect(collectionNameObj.submissionCollection);

    const allSubmissions = await submissionCollection.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(allSubmissions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
