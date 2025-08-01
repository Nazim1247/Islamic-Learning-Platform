import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    
    const reviewCollection = dbConnect(collectionNameObj.reviewCollection);

    const result = await reviewCollection.insertOne({
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
    const reviewCollection = dbConnect(collectionNameObj.reviewCollection);

    const allReviews = await reviewCollection.find().sort({ createdAt: -1 }).limit(3).toArray();
    return NextResponse.json(allReviews);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

