import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const resultId = await params.id;
    const result = await dbConnect(collectionNameObj.resultCollection).deleteOne({ _id: new ObjectId(resultId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Result deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Result not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting result' }, { status: 500 });
  }
}
