import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { name, email, password, image, role } = await req.json();

    // Connect to MongoDB
    const usersCollection = dbConnect(collectionNameObj.userCollection);

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      image,
      role,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } 
}
