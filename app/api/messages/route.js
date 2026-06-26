import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const message = await Message.create(body);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const senderId = searchParams.get("senderId");
    const receiverId = searchParams.get("receiverId");

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    }).sort({ createdAt: 1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
