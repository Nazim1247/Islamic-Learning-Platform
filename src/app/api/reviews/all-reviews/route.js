import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reviewCollection = dbConnect(collectionNameObj.reviewCollection);

    const allReviews = await reviewCollection.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(allReviews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}