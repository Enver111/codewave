import { reviews } from "../../../data/reviews";
import ReviewsClient from "./ReviewsClient";

export default function Reviews() {
  return (
    <ReviewsClient
      showAllLink={false}
      reviews={reviews}
      total={reviews.length}
      page={1}
      pageSize={6}
    />
  );
}
