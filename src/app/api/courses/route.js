import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req)=>{
  try {
    const body = await req.json();
    const courseCollection = dbConnect(collectionNameObj.courseCollection);
    const result = await courseCollection.insertOne(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating courses:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
    
}

export async function GET() {
  try {
    const courseCollection = dbConnect(collectionNameObj.courseCollection);
    const result = await courseCollection.find().toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating courses:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}