import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const body = await req.json();
        const classCollection = dbConnect(collectionNameObj.classCollection);
        const result = await classCollection.insertOne(body);

        return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Error creating class:", error);
    }
}