import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const id = await params.id;
    const result = await dbConnect(collectionNameObj.studentCollection).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Graduate deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Graduate not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting graduate' }, { status: 500 });
  }
}
