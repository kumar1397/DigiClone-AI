import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

type Message = {
  role: "user" | "bot";
  content: string;
};
// --- POST /api/conversation  (save a message)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatHistory, userId, cloneId } = body;

    const messagesToAdd = chatHistory
      .map((pair: Message) => [
        { role: "user", content: pair.content },
      ])
      .flat();

    const existing = await prisma.conversation.findFirst({
      where: { userId, cloneId },
    });

    if (existing) {
      await prisma.conversation.update({
        where: { id: existing.id },
        data: { messages: { create: messagesToAdd } },
      });
    } else {
      await prisma.conversation.create({
        data: {
          userId,
          cloneId,
          messages: messagesToAdd,
        },
      });
    }

    return NextResponse.json({ success: true, message: "Conversation saved." });
  } catch (error) {
    console.error("❌ Error saving conversation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save conversation." },
      { status: 500 }
    );
  }
}

// --- GET /api/conversation  (get conversation)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")!;
    const cloneId = searchParams.get("cloneId")!;

    const conversation = await prisma.conversation.findFirst({
      where: { userId, cloneId },
      include: { messages: true },
    });

    return NextResponse.json({
      success: true,
      messages: conversation?.messages ?? [],
    });
  } catch (error) {
    console.error("❌ Error fetching conversation:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch conversation." },
      { status: 500 }
    );
  }
}
