"use server";

import prisma from "@/prisma";

export async function uploadYoutubeLinks(cloneId: string, links: string[]) {
  return prisma.cloneProfile.update({
    where: { clone_id: cloneId },
    data: {
      youtubeLinkUpload: {
        push: links, // append array
      },
    },
  });
}

export async function uploadOtherLinks(cloneId: string, links: string[]) {
  return prisma.cloneProfile.update({
    where: { clone_id: cloneId },
    data: {
      otherLinkUpload: {
        push: links, // append array
      },
    },
  });
}
