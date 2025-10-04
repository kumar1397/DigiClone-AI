import prisma from "@/prisma";
import { Role } from "@prisma/client"; 

type Message = {
  role: "user" | "bot";
  content: string;
};

export async function saveConversation(params: {
  chatHistory: Message[];
  userId: string;
  cloneId: string;
}) {
  const { chatHistory, userId, cloneId } = params;

  const messagesToAdd = chatHistory.map(m => ({
    role: m.role === "user" ? Role.user : Role.bot,  
    content: m.content,
  }));

  const existing = await prisma.conversation.findFirst({
    where: { userId, cloneId },
  });

  if (existing) {
    return prisma.conversation.update({
      where: { id: existing.id },
      data: { messages: { create: messagesToAdd } },
    });
  } else {
    return prisma.conversation.create({
      data: {
        userId,
        cloneId,
        messages: { create: messagesToAdd },
      },
    });
  }
}

export async function getConversation(params: { userId: string; cloneId: string }) {
  const { userId, cloneId } = params;

  const conversation = await prisma.conversation.findFirst({
    where: { userId, cloneId },
    include: { messages: true },
  });

  return conversation?.messages ?? [];
}
