import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  try {
    const res = await dbConnect(collectionNameObj.blogCollection).insertOne(body);
    return NextResponse.json({ insertedId: res.insertedId });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await dbConnect(collectionNameObj.blogCollection).find().sort({ _id: -1 }).toArray();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
