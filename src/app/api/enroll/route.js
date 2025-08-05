import { authOptions } from '@/lib/authOptions';
import dbConnect, { collectionNameObj } from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {name,email,image,phone,address,gender,occupation,education,course,timeSlot,socialLink,transactionId,
    } = body;

    // Save to collection "enrollments"
    const result = await dbConnect(collectionNameObj.enrollmentCollection).insertOne({name,email,image,phone,address,gender,occupation,education,course,timeSlot,socialLink,transactionId,createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Enrollment successful!', insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error in /api/enroll:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const GET = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const enrollmentCollection = dbConnect(collectionNameObj.enrollmentCollection);
  const enrollments = await enrollmentCollection.find({ email }).toArray();

  return NextResponse.json(enrollments);
};
