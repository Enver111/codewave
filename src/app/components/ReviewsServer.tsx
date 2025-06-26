import { getReviews } from "@/actions/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ReviewsClient from "./ReviewsClient";

interface ReviewsServerProps {
  limit?: number;
  showAllLink?: boolean;
}

export default async function ReviewsServer({ limit, showAllLink = false }: ReviewsServerProps) {
  const reviews = await getReviews();
  const session = await getServerSession(authOptions);

  return (
    <ReviewsClient
      reviews={reviews}
      session={session}
      limit={limit}
      showAllLink={showAllLink}
    />
  );
}
