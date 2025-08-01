import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const students = await dbConnect(collectionNameObj.studentCollection).find().sort({ _id: -1 }).toArray();

    return new NextResponse(JSON.stringify(students), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}