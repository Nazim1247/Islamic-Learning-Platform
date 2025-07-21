
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const studentData = await req.json();

    const studentCollection = dbConnect(collectionNameObj.studentCollection);

    const result = await studentCollection.insertOne(studentData);

    return NextResponse.json({ success: true, message: "Student registered", insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error inserting student:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const students = await dbConnect(collectionNameObj.studentCollection).find().toArray();

    return new NextResponse(JSON.stringify(students), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
