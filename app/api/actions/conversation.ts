import prisma from "@/prisma";

type Message = {
  role: "user" | "clone"; 
  content: string;
};

export async function saveConversation(params: {
  chatHistory: Message[];
  userId: string;
  cloneId: string;
}) {
  const { chatHistory, userId, cloneId } = params;

  const messagesToAdd = chatHistory.map(m => ({
    role: m.role,
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
