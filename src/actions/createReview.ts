"use server";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface CreateReviewPayload {
  rating: number;
  text: string;
}

export async function createReview(payload: CreateReviewPayload) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const { rating, text } = payload;

  if (!rating || !text) {
    throw new Error("Missing fields");
  }

  const review = await prisma.review.create({
    data: {
      rating,
      text,
      userId: session.user.id,
    },
  });

  return review;
}
