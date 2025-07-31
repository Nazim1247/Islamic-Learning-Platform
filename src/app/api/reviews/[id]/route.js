import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const reviewId = params.id;
    const result = await dbConnect(collectionNameObj.reviewCollection).deleteOne({ _id: new ObjectId(reviewId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Review deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting review' }, { status: 500 });
  }
}
