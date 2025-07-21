import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const teachersCollection = dbConnect(collectionNameObj.teacherCollection);

    const result = await teachersCollection.insertOne(data);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    console.error("Error inserting teacher:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const teachers = await dbConnect(collectionNameObj.teacherCollection).find().toArray();

    return new NextResponse(JSON.stringify(teachers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
