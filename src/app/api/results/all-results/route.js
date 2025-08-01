import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const resultCollection = dbConnect(collectionNameObj.resultCollection);
    const results = await resultCollection.find().sort({ _id: -1 }).toArray();

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}