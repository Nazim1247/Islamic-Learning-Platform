
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// DELETE API Route
export async function DELETE(req, { params }) {
  try {
    const blogId = params.id;

    const result = await dbConnect(collectionNameObj.blogCollection).deleteOne({
      _id: new ObjectId(blogId),
    });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Blog deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting blog' }, { status: 500 });
  }
}

