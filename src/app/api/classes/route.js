import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const classCollection = dbConnect(collectionNameObj.classCollection);
        const result = await classCollection.insertOne(body);

        return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
  try {
    const classCollection = dbConnect(collectionNameObj.classCollection);
    const result = await classCollection.find().toArray();

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}