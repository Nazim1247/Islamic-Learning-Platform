import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    
    const result = await dbConnect(collectionNameObj.courseCollection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ success: true, message: "Course deleted successfully" });
    } else {
      return NextResponse.json({ success: false, message: "Course not found" });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
  }
}