import prisma from "@/prisma";
import { NextResponse , NextRequest} from "next/server";

export const saveMessage = async (req:NextRequest, res:NextResponse) => {
  try {
    const { chatHistory, userId, cloneId } = req.body;

    const messagesToAdd = chatHistory.map(pair => [
      { role: "user", content: pair.user },
      { role: "clone", content: pair.bot.content }
    ]).flat();

    const existing = await prisma.conversation.findFirst({
      where: { userId, cloneId },
    });

    if (existing) {
      await prisma.conversation.update({
        where: { id: existing.id },
        data: { messages: { push: messagesToAdd } }
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

    return res.status(200).json({ message: "Conversation saved." });
  } catch (error) {
    console.error("❌ Error saving conversation:", error);
    return res.status(500).json({ error: "Failed to save conversation." });
  }
};

export const getUserConversations = async (req:NextResponse, res:NextResponse) => {
  try {
    const { userId, cloneId } = req.body;

    const conversation = await prisma.conversation.findFirst({
      where: { userId, cloneId },
    });

    return res.status(200).json({ messages: conversation?.messages ?? [] });
  } catch (error) {
    console.error("❌ Error fetching conversation:", error);
    return res.status(500).json({ error: "Failed to fetch conversation." });
  }
};

export const getUserClonesWithDetails = async (req:NextRequest, res:NextResponse) => {
  try {
    const { userId } = req.params;

    const conversations = await prisma.conversation.findMany({
      where: { userId },
      select: { cloneId: true },
    });

    const cloneIds = [...new Set(conversations.map(c => c.cloneId))];

    if (cloneIds.length === 0) {
      return res.json({ clones: [] });
    }

    const clones = await prisma.cloneProfile.findMany({
      where: { clone_id: { in: cloneIds } },
      select: { clone_id: true, clone_name: true, image: true },
    });

    return res.json({ clones });
  } catch (error) {
    console.error("❌ Error fetching clone details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
