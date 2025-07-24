
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const { role } = await req.json();

  try {
    const result = await dbConnect(collectionNameObj.userCollection).updateOne({ _id: new ObjectId(id) }, { $set: { role } });

    return NextResponse.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    console.error("Role update failed:", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
