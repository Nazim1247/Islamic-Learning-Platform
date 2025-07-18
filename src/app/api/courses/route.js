import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
    const body = await req.json();
    const courseCollection = dbConnect(collectionNameObj.courseCollection);
    const result = await courseCollection.insertOne(body);

    return NextResponse.json(result);
}

export async function GET() {
  try {
    const courseCollection = dbConnect(collectionNameObj.courseCollection);
    const result = await courseCollection.find().toArray();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}