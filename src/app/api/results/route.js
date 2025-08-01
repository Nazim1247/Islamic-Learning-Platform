import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    
    const resultCollection = dbConnect(collectionNameObj.resultCollection);

    const result = await resultCollection.insertOne({
      ...body,
      createdAt: new Date()
    });

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const resultCollection = dbConnect(collectionNameObj.resultCollection);
    const results = await resultCollection.find().sort({ _id: -1 }).limit(3).toArray();

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
