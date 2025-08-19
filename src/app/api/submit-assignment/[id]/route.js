import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import dbConnect, { collectionNameObj } from "@/lib/dbConnect"

export async function PATCH(req, { params }) {
  try {
    const { id } = params
    const { marks, feedback } = await req.json()

    const res = await dbConnect(collectionNameObj.submissionCollection).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          marks: Number(marks),
          feedback: feedback || "",
          status: "graded",
          gradedAt: new Date(),
        },
      }
    )

    return NextResponse.json({ success: true, modified: res.modifiedCount })
  } catch (err) {
    console.error("Error updating marks:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
