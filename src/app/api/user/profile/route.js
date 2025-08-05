import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const userCollection = dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Server User Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const userCollection = await dbConnect("users");
    const user = await dbConnect(collectionNameObj.userCollection).findOne({ email: session?.user?.email });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Server Result Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, image, password } = body;

    const userCollection = dbConnect(collectionNameObj.userCollection);

    const updateDoc = {
      $set: {
        name,
        image,
      },
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateDoc.$set.password = hashedPassword;
    }

    const result = await userCollection.updateOne(
      { email: session?.user?.email },
      updateDoc
    );

    if (!result.modifiedCount) {
      return NextResponse.json({ error: 'No changes made' }, { status: 400 });
    }

    const updatedUser = await userCollection.findOne({
      email: session?.user?.email,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Server Result Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


