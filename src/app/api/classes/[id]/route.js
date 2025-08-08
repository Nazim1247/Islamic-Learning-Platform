
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    const body = await req.json();
    const classCollection = dbConnect(collectionNameObj.classCollection);
    const result = await classCollection.insertOne(body);

    return NextResponse.json(result);
}

// GET handler
export async function GET(req, { params }) {
  try {

    const {id} = await params;

    const classItem = await dbConnect(collectionNameObj.classCollection).findOne({ _id: new ObjectId(id) });

    if (!classItem) {
      return NextResponse.json({ message: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classItem);

  } catch (error) {
    console.error("GET class error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PATCH: update a course by ID
export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    const { id } = params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
    }

    // Remove _id from body if it exists
    if (body._id) {
      delete body._id;
    }

    const result = await dbConnect(collectionNameObj.classCollection).updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Course not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
