import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const teacherId = params.id;
    const result = await dbConnect(collectionNameObj.teacherCollection).deleteOne({ _id: new ObjectId(teacherId) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Teacher deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting teacher' }, { status: 500 });
  }
}
