import prisma from "@/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  try {
    const conversations = await prisma.conversation.findMany({
      where: { userId },
      select: { cloneId: true },
    });

    const cloneIds = [...new Set(conversations.map((c) => c.cloneId))];

    if (cloneIds.length === 0) {
      return NextResponse.json({ success: true, clones: [] });
    }

    const clones = await prisma.cloneProfile.findMany({
      where: { clone_id: { in: cloneIds } },
      select: { clone_id: true, clone_name: true, image: true },
    });

    return NextResponse.json({ success: true, clones });
  } catch (error) {
    console.error("❌ Error fetching clone details:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
