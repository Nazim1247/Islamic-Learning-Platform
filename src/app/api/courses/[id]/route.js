import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// GET: fetch a single course by ID
export async function GET(req, { params }) {
  try {
    const course = await dbConnect(collectionNameObj.courseCollection).findOne({
      _id: new ObjectId(params.id),
    });

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("GET error:", error);
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

    const result = await dbConnect(collectionNameObj.courseCollection).updateOne(
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

